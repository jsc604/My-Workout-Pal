import { FunctionComponent, useState } from "react";
import { StatusBar } from "expo-status-bar";
import styled from "styled-components/native";
import firebase from 'firebase/compat/app';
import "firebase/compat/auth";

// custom components
import { Container } from "../components/shared";
import RegularButton from "../components/buttons/RegularButton";
import { colors } from "../components/colors";

// navigation
import { RootStackParamList } from "../navigators/RootStack"
import { NativeStackScreenProps } from "@react-navigation/native-stack";
type Props = NativeStackScreenProps<RootStackParamList, "Settings">;

const SettingsContainer = styled(Container)`
`;

const Settings: FunctionComponent<Props> = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <SettingsContainer>
      <StatusBar style="light" />
      <RegularButton
        onPress={() => { setDarkMode(!darkMode) }}
        btnStyles={{ width: '70%', marginTop: 20, backgroundColor: colors.purple }}
        textStyles={{ fontWeight: 'bold' }}
      >
        {darkMode ? 'Dark Mode' : 'Light Mode'}
      </RegularButton>
      <RegularButton
        onPress={() => firebase.auth().signOut()}
        btnStyles={{ width: '70%', marginTop: 20, backgroundColor: colors.pink }}
        textStyles={{ fontWeight: 'bold' }}
      >
        Log Out
      </RegularButton>
    </SettingsContainer>
  )
};

export default Settings;