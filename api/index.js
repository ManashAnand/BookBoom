const mysql = require("mysql");
const cors = require("cors");
const express = require("express");
const dotenv = require("dotenv");
const multer = require("multer");
const fs = require("fs");
const bcrypt = require("bcryptjs");

// const require = createRequire(import.meta.url);

// console.log(dirname)
const salt = process.env.SALT;

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());

app.use("/uploads", express.static(__dirname + "/uploads"));
app.use("/profilePic", express.static(__dirname + "/profilePic"));

const upload = multer({ dest: "./uploads/" });
const profilePic = multer({ dest: "./profilePic/" });

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.PASSWORD,
  database: "bookstore",
});

app.get("/", (req, res) => {
  const query = "SELECT * FROM books;";
  db.query(query, (err, data) => {
    if (err) res.statusCode(400).json(err);
    else res.json(data);
  });
});

app.post("/", upload.single("file"), (req, res) => {
  try {
    if (req.file == undefined) {
      res.status(400).json("Please upload a image also");
      return;
    }
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);

    const { name, author, description } = req.body;
    // console.log(name+" "+author+" "+description+" "+newPath)

    const query =
      "Insert into books (`name`,`descp`,`author`,`cover`)  values (?,?,?,?);";

    db.query(query, [name, description, author, newPath], (err, data) => {
      if (err) res.json("Error in uploading file" + err);
      else res.json("File uploaded successfully");
    });
  } catch (error) {
    console.log(error);
  }
});

app.post("/register", profilePic.single("profilePic"), (req, res) => {
  try {
    if (req.file == undefined) {
      res.status(400).json("Please upload a image also");
      return;
    }
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);

    const { name, email, pass, phoneNo } = req.body;

    const hash = bcrypt.hashSync(pass, salt);

    const query =
      "Insert into users (`name`,`email`,`pass`,`phoneNo`,`profilePic`)  values (?,?,?,?,?);";
    db.query(query, [name, email, hash, phoneNo, newPath], (err, data) => {
      if (err) res.json({ err: "Error in uploading file" + err });
      else res.json("User registered successfully");
    });
  } catch (error) {
    console.log("from index file here");
    console.log(error);
  }
});

app.post("/login", (req, res) => {
  try {
    const { email, pass } = req.body;

    const q = "SELECT * FROM users WHERE email = ?;";

    db.query(q, [email], (err, data) => {
      if (err) {
        console.error("Error in finding email:", err);
        res.status(500).json({ error: "An error occurred" });
      } else {
        if (data.length > 0) {
          const hashedPasswordFromDatabase = data[0]?.pass;

          if (bcrypt.compareSync(pass, hashedPasswordFromDatabase)) {
            const userDataWithoutPassword = { ...data[0] };
            delete userDataWithoutPassword.pass;

            res.json(userDataWithoutPassword);
          } else {
            res.status(401).json({ error: "Authentication failed" });
          }
        } else {
          res.status(401).json({ error: "User not found" });
        }
      }
    });
  } catch (error) {
    console.log(error);
  }
});

app.post("/search", (req, res) => {
    const {value} = req.body;
    // console.log(value)
    const keyword = value; 
    const q = "SELECT * FROM books WHERE LOWER(name) LIKE ? OR LOWER(descp) LIKE ?";
    db.query(q, [`%${keyword}%`, `%${keyword}%`], (err, data) => {
        if(err){
            console.log("data not found "+ err )
        }
        else{
            console.log(data)
            res.json(data);
        }
    })
})


app.listen(8800, () => {
  console.log("Connected to database");
});
