import { ExerciseBlock, ExerciseCluster } from "./workoutTypes";


export const formatWorkout = (exercises: ExerciseBlock[]): ExerciseCluster[] => {
  return exercises.map((exercise) => {
    const sets = [];
    for (let i = 1; i <= exercise.sets; i++) {
      sets.push({
        setIndex: i,
        reps: exercise.reps,
        weight: 0
      });
    }
    return {
      exercise: exercise.exercise,
      sets: sets
    };
  });
};
