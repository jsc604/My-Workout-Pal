import { FunctionComponent } from "react";

// screens
import Login from "../screens/Login";

// react navigation
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export type AuthStackParamList = {
  CreateAccount: undefined;
  Login: undefined;
};

const Auth = createNativeStackNavigator<AuthStackParamList>();

const AuthStack: FunctionComponent = () => {
  return (
    <Auth.Navigator>
      <Auth.Screen 
       name="Login"
       component={Login}
      //  options={{ headerShown: false }}
      />
    </Auth.Navigator>
  )
};

export default AuthStack;