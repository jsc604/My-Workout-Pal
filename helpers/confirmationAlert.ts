import firebase from "firebase/compat";
import { removeDoc } from "./databaseHelpers";
import Swal from "sweetalert2";
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
