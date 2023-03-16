import React, { FunctionComponent, useContext } from "react";
import { StatusBar } from "expo-status-bar";
import styled from "styled-components/native";
import firebase from '../node_modules/firebase/compat/';

// custom components
import { Container } from "../components/shared";
import RegularButton from "../components/buttons/RegularButton";
import { colors } from "../components/colors";
import { DarkModeContext } from "../providers/DarkModeProvider";

// navigation
import { RootStackParamList } from "../navigators/RootStack"
import { NativeStackScreenProps } from "@react-navigation/native-stack";
type Props = NativeStackScreenProps<RootStackParamList, "Settings">;

const SettingsContainer = styled(Container)`
`;

const Settings: FunctionComponent<Props> = () => {
  const { darkMode, setDarkMode } = useContext(DarkModeContext);

  return (
    <SettingsContainer style={{ backgroundColor: darkMode ? '#2d2d30' : 'white' }}>
      <StatusBar style={darkMode ? 'dark' : 'light'} />
      <RegularButton
        onPress={() => { setDarkMode(!darkMode) }}
        btnStyles={{ width: '70%', marginTop: 20, backgroundColor: darkMode ? colors.orange : colors.purple }}
        textStyles={{ fontWeight: 'bold' }}
      >
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </RegularButton>
      <RegularButton
        onPress={() => firebase.auth().signOut()}
        btnStyles={{ width: '70%', marginTop: 20, backgroundColor: colors.red }}
        textStyles={{ fontWeight: 'bold' }}
      >
        Log Out
      </RegularButton>
    </SettingsContainer>
  )
};

export default Settings;