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

export type WorkoutListArray = Workout[];

export type SetWorkoutList = (newList: WorkoutListArray) => void;

export type WorkoutHistoryListType = {
  completedSets: ExerciseCluster[];
  date: string;
  id: string;
  workoutName: string;
};

export type SetWorkoutHistoryList = (newlist: WorkoutHistoryListType[]) => void;