const express = require('express');
//const dotenv = require('dotenv');
const path = require('path');
const mongoose = require('mongoose');
const Workout = require('./models/workout');

const app = express();

//dotenv.config();

const port = process.env.PORT || 3000;

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static("public"));



//Mongoose + Heroku connect

mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost/Fitness-TrackerDB',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    }
);

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
    Workout.aggregate ([
        {
            $addFields:{
                totalDuration:{
                    $sum: '$exercises.duration'
                }
            }
        }
    ]).then(res.json)
    .catch(res.json); 
});

app.put("/api/workouts/:id", (req,res) =>{
    const workoutid = req.params.id;
    const exercise = req.body;
    // send information??? as JSON  ||  Anything sent is completely ignored!
    Workout.findByIdAndUpdate(workoutid,
        {$push: {exercises:exercise}},
        {new:true, runValidators: true}
        ).then(res.json)
        .catch(res.json);
});

app.post("/api/workouts", (req, res) =>{
    const workout = req.body; // As written front-end will always send an EMPTY object in Req.Body!!
    // send information??? as JSON
    Workout.create(workout)
    .then(res.json)
    .catch(res.json);
});

app.get("/api/workouts/range", (req, res) =>{
    // send JSON potentially array
    Workout.aggregate([
        {
            $addFields:{
                totalDuration: {
                    $sum: '$exercises.duration'
                }
            }
        }
    ]).sort({_id:-1})
    .limit(7)
    .then(res.json)
    .catch(res.json);
});

app.listen(port, ()=>{
    console.log(`Server is listening on ${port}!`);
});


//
