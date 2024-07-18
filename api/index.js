const mysql = require("mysql");
const cors = require("cors");
const express = require("express");
const dotenv = require("dotenv");
const multer = require("multer");
const fs = require("fs");
const bcrypt = require("bcryptjs");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/uploads", express.static(__dirname + "/uploads"));
app.use("/profilePic", express.static(__dirname + "/profilePic"));

const upload = multer({ dest: "./uploads/" });
const profilePic = multer({ dest: "./profilePic/" });

const dbConfig = {
  host: "localhost",
  user: "root",
  password: process.env.PASSWORD,
  database: "books",
};

let db;

function handleDisconnect() {
  db = mysql.createConnection(dbConfig);

  db.connect(err => {
    if (err) {
      console.error('Error connecting to database:', err);
      setTimeout(handleDisconnect, 2000);
    } else {
      console.log('Connected to database');
    }
  });

  db.on('error', err => {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      handleDisconnect();
    } else {
      throw err;
    }
  });
}

handleDisconnect();

app.get("/", (req, res) => {
  const query = "SELECT * FROM books;";
  db.query(query, (err, data) => {
    if (err) res.json(err);
    else res.json(data);
  });
});

app.post("/", upload.single("file"), (req, res) => {
  try {
    if (req.file == undefined) {
      res.status(400).json("Please upload an image also");
      return;
    }
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);

    const { name, author, description } = req.body;
    
    const query = "INSERT INTO books (`name`, `descp`, `author`, `cover`) VALUES (?, ?, ?, ?);";
    db.query(query, [name, description, author, newPath], (err, data) => {
      if (err) res.json("Error in uploading file: " + err);
      else res.json("File uploaded successfully");
    });
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal server error");
  }
});

app.post("/register", profilePic.single("profilePic"), (req, res) => {
  try {
    if (req.file == undefined) {
      res.status(400).json("Please upload an image also");
      return;
    }
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);

    const { name, email, pass, phoneNo } = req.body;
    const salt = bcrypt.genSaltSync(10); // Generate salt here
    const hash = bcrypt.hashSync(pass, salt);

    const query = "INSERT INTO users (`name`, `email`, `pass`, `phoneNo`, `profilePic`) VALUES (?, ?, ?, ?, ?);";
    db.query(query, [name, email, hash, phoneNo, newPath], (err, data) => {
      if (err) res.json({ err: "Error in uploading file: " + err });
      else res.json("User registered successfully");
    });
  } catch (error) {
    console.log("Error from index file here:", error);
    res.status(500).json("Internal server error");
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
    res.status(500).json("Internal server error");
  }
});

app.post("/search", (req, res) => {
  const { value } = req.body;
  const keyword = value.toLowerCase();
  const q = "SELECT * FROM books WHERE LOWER(name) LIKE ? OR LOWER(descp) LIKE ?";
  db.query(q, [`%${keyword}%`, `%${keyword}%`], (err, data) => {
    if (err) {
      console.log("Data not found: " + err);
      res.status(500).json({ error: "An error occurred" });
    } else {
      res.json(data);
    }
  });
});

app.listen(8800, () => {
  console.log("Server is running on port 8800");
});
