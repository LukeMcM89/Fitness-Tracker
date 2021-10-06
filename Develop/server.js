const express = require('express');
const dotenv = require('dotenv');
const path = require('path');

const app = express();

dotenv.config();

const port = process.env.PORT || 3000;

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static("public"));

//HTML routes

app.get("/", (req,res) =>{
    res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/stats", (req,res) =>{
    res.sendFile(path.join(__dirname, "public/stats.html"));
});

app.get("/exercise", (req,res) =>{
    res.sendFile(path.join(__dirname, "public/exercise.html"));
});

//API routes

app.get("/api/workouts", (req,res) =>{
    //send an array of objects as JSON

});

app.put("/api/workouts/:id", (req,res) =>{
    const workoutid = req.params.id;
    const exercise = req.body;
    // send information??? as JSON  ||  Anything sent is completely ignored!
});

app.post("/api/workouts", (req, res) =>{
    const workout = req.body; // As written front-end will always send an EMPTY object in Req.Body!!
    // send information??? as JSON
});

app.get("/api/workouts/range", (req, res) =>{
    // send JSON potentially array
});








app.listen(port, ()=>{
    console.log(`Server is listening on ${port}!`);
});



