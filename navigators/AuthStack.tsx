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
    <Auth.Navigator
      screenOptions={{
        headerTintColor: 'white',
        headerStyle: {
          backgroundColor: '#2d2d30',
        },
        
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