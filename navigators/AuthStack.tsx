import { FunctionComponent } from "react";
import DarkModeToggle from "../components/header/DarkModeToggle";

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

  return (
    <Auth.Navigator
      screenOptions={{
        headerTintColor: 'white',
        headerStyle: {
          backgroundColor: '#2d2d30',
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