type Exercise = {
  exercise: string;
  sets: number;
  reps: number;
};

export type ExerciseSet = {
  exercise: string;
  sets: {
    setIndex: number;
    reps: number;
    weight: number;
  }[];
};

export const formatWorkout = (exercises: Exercise[]): ExerciseSet[] => {
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
