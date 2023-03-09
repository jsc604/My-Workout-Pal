import firebase from "firebase/compat";
import "firebase/compat/firestore";
import "firebase/compat/auth";
const { firestore, auth } = firebase;

export const onSnapshot = (ref, callback, options?) => {
  ref.onSnapshot((snapshot) => {
    let items = snapshot.docs.map((doc) => {
      const data = doc.data();
      data.id = doc.id;
      return data;
    });
    items = options && options.sort ? items.sort(options.sort) : items;
    callback(items);
  });
};

export const addDoc = (
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

export const updateDoc = (ref, name: string, { ...data }) => {
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
