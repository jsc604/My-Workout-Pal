import React, { FunctionComponent, useContext } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { DarkModeContext } from "../../providers/DarkModeProvider";
import RegularText from "../texts/RegularText";

// firebase
import firebase from '../../node_modules/firebase/compat';
import { colors } from "../colors";
const { auth } = firebase;

const GuestLogin: FunctionComponent = () => {
  const { darkMode } = useContext(DarkModeContext);

  const styles = StyleSheet.create({
    button: {
      marginLeft: 20,
      padding: 5,
      borderWidth: 1,
      borderRadius: 7,
      borderColor: darkMode ? '#ECEFF1' : 'blue',
      backgroundColor: darkMode ? '#ECEFF1' : colors.blue,
    }
  });

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => auth().signInAnonymously()}
    >
      <RegularText textStyles={{ color: 'black' }}>Guest Demo</RegularText>
    </TouchableOpacity>
  )
};

export default GuestLogin;
