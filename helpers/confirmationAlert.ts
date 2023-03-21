// firebase
import firebase from "../node_modules/firebase/compat/";
const { auth } = firebase;

import Swal from "sweetalert2";
import { addNewWorkoutHistoryDoc, removeDoc } from "./databaseHelpers";
import { colors } from "../components/colors";
import { ExerciseCluster } from "./workoutTypes";

export const alertComplete = (
  listsRef: firebase.firestore.CollectionReference<firebase.firestore.DocumentData>,
  date: string,
  workoutName: string,
  completedSets: ExerciseCluster[],
  darkMode: boolean,
  navigation: () => void
) => {
  Swal.fire({
    title: "Are you sure?",
    text: "Make sure you have completed all your sets!",
    icon: "warning",
    iconColor: colors.orange,
    showCancelButton: true,
    confirmButtonColor: "green",
    cancelButtonColor: "red",
    confirmButtonText: "Yes, complete it!",
    reverseButtons: true,
    background: darkMode ? "#2d2d30" : "white",
    color: darkMode ? "white" : "black",
  }).then((result) => {
    if (result.isConfirmed) {
      addNewWorkoutHistoryDoc(listsRef, date, workoutName, completedSets)
      navigation();

      Swal.fire({
        title: "Good Job!",
        text: "Your workout has been recorded.",
        icon: "success",
        iconColor: "#77DD77",
        confirmButtonColor: "green",
        background: darkMode ? "#2d2d30" : "white",
        color: darkMode ? "white" : "black",
      });
    }
  });
};

export const alertDelete = (
  darkMode: boolean,
  ref: firebase.firestore.CollectionReference<firebase.firestore.DocumentData>,
  id: string
) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    iconColor: colors.orange,
    showCancelButton: true,
    confirmButtonColor: "green",
    cancelButtonColor: "red",
    confirmButtonText: "Yes, delete it!",
    reverseButtons: true,
    background: darkMode ? "#2d2d30" : "white",
    color: darkMode ? "white" : "black",
  }).then((result) => {
    if (result.isConfirmed) {
      removeDoc(ref, id);
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success",
        iconColor: "#77DD77",
        confirmButtonColor: "green",
        background: darkMode ? "#2d2d30" : "white",
        color: darkMode ? "white" : "black",
      });
    }
  });
};

export const alertUpdate = (
  darkMode: boolean,
  ref: firebase.firestore.CollectionReference<firebase.firestore.DocumentData>,
  oldDoc: string,
  date: string,
  workoutName: string,
  { ...data },
  callback: () => void
) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    iconColor: colors.orange,
    showCancelButton: true,
    confirmButtonColor: "green",
    cancelButtonColor: "red",
    confirmButtonText: "Yes, update it!",
    reverseButtons: true,
    background: darkMode ? "#2d2d30" : "white",
    color: darkMode ? "white" : "black",
  }).then((result) => {
    if (result.isConfirmed) {
      const newDocRef = ref.doc(`${date}: ${workoutName}`);
      newDocRef.set({ completedSets: data, workoutName, date });
      removeDoc(ref, oldDoc);
      callback();
      console.log(`updated item: ${oldDoc}`);

      Swal.fire({
        title: "Updated!",
        text: "Your workout has been updated.",
        icon: "success",
        iconColor: "#77DD77",
        confirmButtonColor: "green",
        background: darkMode ? "#2d2d30" : "white",
        color: darkMode ? "white" : "black",
      });
    }
  });
};

export const resetPassword = (darkMode: boolean) => {
  Swal.fire({
    title: "Forgot Password",
    text: "Please enter your email address below",
    input: "email",
    icon: "question",
    color: darkMode ? "white" : "black",
    background: darkMode ? "#2d2d30" : "white",
    confirmButtonColor: "green",
    reverseButtons: true,
    inputAttributes: {
      autocapitalize: "off",
    },
    showCancelButton: true,
    confirmButtonText: "Reset Password",
    showLoaderOnConfirm: true,
    preConfirm: (email) => {
      auth().sendPasswordResetEmail(email);
    },
    allowOutsideClick: () => !Swal.isLoading(),
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Password Reset Email Sent",
        icon: "success",
        iconColor: "green",
        confirmButtonColor: "green",
        color: darkMode ? "white" : "black",
        background: darkMode ? "#2d2d30" : "white",
      });
    }
  });
};
