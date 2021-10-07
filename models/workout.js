const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const fitnessSchema = new Schema({
  day: {
    type: Date,
    default: Date.now,
  },
  exercises: [
    {
      type: {
        type: String,
        required: "Select an exercise.",
      },
      name: {
        type: String,
        required: "Select an exercise name.",
      },
      duration: {
        type: Number,
        required: "Select a amount of time.",
      },
      weight: {
        type: Number,
      },
      reps: {
        type: Number,
      },
      sets: {
        type: Number,
      },
    },
  ],
});

const Workout = mongoose.model("Workout", fitnessSchema);

module.exports = workout;