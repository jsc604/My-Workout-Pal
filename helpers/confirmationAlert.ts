import firebase from "firebase/compat";
import { Alert } from "react-native";
import { removeDoc } from "./databaseHelpers";

export const alertDelete = (
  command: string,
  ref: firebase.firestore.CollectionReference<firebase.firestore.DocumentData>,
  id: string
) =>
  Alert.alert(
    `Confirm ${command}`,
    `Are you sure you want to ${command} this workout?`,
    [
      { text: "Cancel", onPress: () => console.log("cancelled") },
      { text: "Confirm", onPress: () => removeDoc(ref, id) },
    ]
  );
