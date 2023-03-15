// firebase
import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import "firebase/compat/firestore";
const { auth } = firebase;

import Swal from "sweetalert2";
import { removeDoc } from "./databaseHelpers";
import { colors } from "../components/colors";

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

export const resetPassword = () => {
  Swal.fire({
    title: "Forgot Password",
    text: "Please enter your email address below",
    input: "email",
    icon: "question",
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
      });
    }
  });
};
