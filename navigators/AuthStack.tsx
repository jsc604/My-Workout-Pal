import React, { FunctionComponent, useContext } from "react";
import DarkModeToggle from "../components/header/DarkModeToggle";
import { DarkModeContext } from "../providers/DarkModeProvider";

// screens
import Login from "../screens/Login";

// react navigation
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export type AuthStackParamList = {
  CreateAccount: undefined;
  Login: undefined;
  Settings: undefined;
};

const Auth = createNativeStackNavigator<AuthStackParamList>();

const AuthStack: FunctionComponent = () => {
  const {darkMode} = useContext(DarkModeContext);

  return (
    <Auth.Navigator
      screenOptions={{
        headerTintColor: darkMode ? 'white' : 'black',
        headerStyle: {
          backgroundColor: darkMode ? '#2d2d30' : 'white',
        },
        headerRight: () => (
          <DarkModeToggle />
        )
      }}>
      <Auth.Screen
        name="Login"
        component={Login}
        options={{
          headerTitleAlign: 'center'
        }}
      />
    </Auth.Navigator>
  )
};

export default AuthStack;