const DB = require("./db.json");
const { saveToDatabase } = require("./utils");

const getAllWorkouts = (filterParams) => {
  try {
    let workouts = DB.workouts;
    if(filterParams.mode){
      return DB.workouts.filter((workout) => workout.mode.toLowerCase().includes(filterParams.mode));
    }
    return workouts;
  } catch (error) {
    throw {status: 500, message: error}
  }
};

const getOneWorkout = (workoutId) => {
  const workout = DB.workouts.find((workout) => workout.id === workoutId);
  if(!workout){
    return ;
  }
  return workout;
}

const createNewWorkout = (newWorkout) => {
  const isAlreadyAdded = DB.workouts.findIndex(((workout) => workout.name === newWorkout.name)) > -1;

  if(isAlreadyAdded){
    throw{
      status: 400,
      message: `Workout with the same name '${newWorkout.name}' already exist`
    }
  }
  try {
    DB.workouts.push(newWorkout);
    saveToDatabase(DB);
    return newWorkout;
  } catch (error) {
    throw{
      error: 500,
      message: error?.message || error
    }
  }
};

const updateOneWorkout = (workoutId, changes) => {
  const indexForUpdate = DB.workouts.findIndex((workout) => workout.id === workoutId);

  if(indexForUpdate === -1){
    return ;
  }

  const updatedWorkout ={
    ...DB.workouts[indexForUpdate],
    ...changes,
    updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC"}),
  }

  DB.workouts[indexForUpdate] = updatedWorkout;
  saveToDatabase(DB);
  return updatedWorkout;

}

const deleteOneWorkout = (workoutId) =>{
  const indexForDelete = DB.workouts.findIndex((workout) => workout.id === workoutId);

  if(indexForDelete === -1){
    return ;
  }

  DB.workouts.splice(indexForDelete, 1);
  saveToDatabase(DB);
}

module.exports = {
  getAllWorkouts,
  getOneWorkout,
  createNewWorkout,
  updateOneWorkout,
  deleteOneWorkout
};
