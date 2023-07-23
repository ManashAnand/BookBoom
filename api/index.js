const mysql = require('mysql');
const cors = require('cors');
const express = require('express');
const dotenv = require('dotenv');
const multer = require('multer');
const fs = require('fs');


// const require = createRequire(import.meta.url);

// console.log(dirname)

const app = express()
dotenv.config();
app.use(express.json())
app.use(cors())
app.use('/uploads', express.static(__dirname + '/uploads'));

const upload = multer({dest: './uploads/'})

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:process.env.PASSWORD,
    database:"bookstore"
})

app.get('/',(req,res) => {
    const query = "SELECT * FROM books;"
    db.query(query,(err,data) => {
        if(err) res.statusCode(400).json(err);
        else  res.json(data)
    })
})

app.post('/',upload.single('file'),(req,res) => {
    try {
        if(req.file == undefined){
            res.status(400).json("Please upload a image also")
            return;
        }
        const { originalname,path } = req.file;
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        const newPath = path+'.'+ext;
        fs.renameSync(path,newPath);

        const {name,author,description} = req.body;
        // console.log(name+" "+author+" "+description+" "+newPath)

        const query = "Insert into books (`name`,`descp`,`author`,`cover`)  values (?,?,?,?);"

        db.query(query,[name,description,author,newPath],(err,data) => {
            if(err) res.json("Error in uploading file"+err)
            else res.json("File uploaded successfully")
        })

    } catch (error) {
        console.log(error)   
    }
})

app.listen(8800,() => {
    console.log("Connected to database")
})