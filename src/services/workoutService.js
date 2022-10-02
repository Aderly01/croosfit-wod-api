const { v4:uuid } = require('uuid')
const Workout = require ('../database/Workout');

// ./databse/Workout.js
const getAllWorkouts = (filterParams) => {
    const allWorkouts = Workout.getAllWorkouts(filterParams);
    return allWorkouts;
};

const getOneWorkout = (workoutId) => {
  const workout = Workout.getOneWorkout(workoutId);
  return workout;
};

const createWorkout = (newWorkout) => {
  const workoutToInsert = {
    ...newWorkout,
    id: uuid(),
    createdAt: new Date().toLocaleString("en-US", { timeZone: "UTC"}),
    updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC"}),
  }

  const createdWorkout = Workout.createNewWorkout(workoutToInsert);
  return createdWorkout;
};

const updateOneWorkout = (workoutId, changes) => {
  const updatedWorkout = Workout.updateOneWorkout(workoutId, changes);
  return updatedWorkout;
};

const deleteOneWorkout = (workoutId) => {
  Workout.deleteOneWorkout(workoutId);
  
};


module.exports ={
    getAllWorkouts,
    getOneWorkout,
    createWorkout,
    updateOneWorkout,
    deleteOneWorkout
}
