import React, { FunctionComponent, useContext } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { DarkModeContext } from "../providers/DarkModeProvider";
import { colors } from "./colors";
import RegularText from "./texts/RegularText";

type labelProps = {
  label: string;
  errorMessage?: string | undefined;
  text: string | undefined;
  onChangeText: (text: string) => void;
  autoComplete?: "password" | "email";
  secureTextEntry?: boolean;
};

const LabelledInput: FunctionComponent<labelProps> = ({ label, errorMessage, text, onChangeText, autoComplete, secureTextEntry }) => {
  const {darkMode} = useContext(DarkModeContext);

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <RegularText textStyles={styles.labelStyle} >{label}</RegularText>
        <RegularText textStyles={styles.error}>{errorMessage && `*${errorMessage}`}</RegularText>
      </View>
      <TextInput
        style={{...styles.input, color: darkMode ? 'white' : 'black'}}
        value={text}
        onChangeText={onChangeText}
        autoComplete={autoComplete}
        secureTextEntry={secureTextEntry}
      />
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    margin: 4,
    width: '90%',
  },
  labelContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 4,
    alignItems: 'center'
  },
  labelStyle: {
    fontWeight: 'bold',
    color: colors.black,
  },
  error: {
    color: colors.red,
    fontSize: 15,
    marginLeft: 4,
    textAlign: 'center'
  },
  input: {
    borderBottomColor: colors.black,
    borderBottomWidth: 1,
    paddingLeft: 4,
    height: 32,
    fontSize: 24,
    color: 'white'
  }
})

export default LabelledInput;