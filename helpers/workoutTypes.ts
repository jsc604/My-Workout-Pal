export type ExerciseBlock = {
  exercise: string;
  sets: number;
  reps: number;
};

export type ExerciseCluster = {
  exercise: string;
  sets: {
    setIndex: number;
    reps: number;
    weight: number;
  }[];
};

export type Workout = {
  id: string;
  exercises: ExerciseBlock[];
};
