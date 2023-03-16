import firebase from '../node_modules/firebase/compat/';
const { firestore, auth } = firebase;

import {
  ExerciseBlock,
  SetWorkoutHistoryList,
  SetWorkoutList,
} from "./workoutTypes";

export const getWorkouts = (
  ref: firebase.firestore.CollectionReference<firebase.firestore.DocumentData>,
  callback: SetWorkoutList
) => {
  ref.onSnapshot((snapshot: { docs: any[] }) => {
    let items = snapshot.docs.map((doc) => {
      const data = doc.data();
      data.id = doc.id;
      return data;
    });
    items.sort((a: { id: string }, b: { id: string }) =>
      a.id.localeCompare(b.id)
    );
    callback(items);
  });
};

export const getWorkoutHistory = (
  ref: firebase.firestore.CollectionReference<firebase.firestore.DocumentData>,
  callback: SetWorkoutHistoryList
) => {
  ref.onSnapshot((snapshot: { docs: any[] }) => {
    let items = snapshot.docs.map((doc) => {
      const data = doc.data();
      data.id = doc.id;
      return data;
    });
    callback(items);
  });
};

export const addNewWorkoutDoc = (
  ref: firebase.firestore.CollectionReference<firebase.firestore.DocumentData>,
  name: string,
  { ...data }
) => {
  ref
    .doc(name)
    .set(data)
    .then(() => {
      console.log("add new item");
    });
};

export const addNewWorkoutHistoryDoc = (
  ref: firebase.firestore.CollectionReference<firebase.firestore.DocumentData>,
  date: string,
  name: string,
  { ...data }
) => {
  ref
    .doc(`${date}: ${name}`)
    .set({ date, workoutName: name, completedSets: data })
    .then(() => {
      console.log("add new history item");
    });
};

export const removeDoc = (
  ref: firebase.firestore.CollectionReference<firebase.firestore.DocumentData>,
  id: string
) => {
  ref
    .doc(id)
    .delete()
    .then(() => {
      console.log(`removed item: ${id}`);
    });
};

export const updateDoc = (
  ref: firebase.firestore.CollectionReference<firebase.firestore.DocumentData>,
  name: string,
  { ...data }: { exercises: ExerciseBlock[] }
) => {
  ref
    .doc(name)
    .set(data)
    .then(() => {
      console.log(`updated item: ${name}`);
    });
};

export const getName = async () => {
  const userId = auth().currentUser?.uid;
  if (!userId) {
    return "";
  }
  const doc = await firestore().collection("users").doc(userId).get();
  if (doc.exists) {
    const name = doc.data()?.name;
    return name;
  } else {
    return "";
  }
};
