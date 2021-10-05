const express = require('express');
const dotenv = require('dotenv');
const path = require('path');

const app = express();

dotenv.config();

const port = process.env.PORT || 3000;

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static("public"));
app.get("/", (req,res) =>{
    res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/stats", (req,res) =>{
    res.sendFile(path.join(__dirname, "public/stats.html"));
});

app.get("/exercise", (req,res) =>{
    res.sendFile(path.join(__dirname, "public/exercise.html"));
});

app.listen(port, ()=>{
    console.log(`Server is listening on ${port}!`);
});

