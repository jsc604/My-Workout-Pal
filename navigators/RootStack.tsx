import { FunctionComponent } from "react";

// screens
import Welcome from "../screens/Welcome";
import Home from "../screens/Home";

// react navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// custom components
import { colors } from "../components/colors";

type RootStackParamList = {
  Welcome: undefined;
  Home: undefined;
}

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStack: FunctionComponent = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        // screenOptions={{
        //   headerStyle: {
        //     backgroundColor: colors.black,
        //     borderBottomWidth: 0,
        //     shadowColor: 'transparent',
        //     shadowOpacity: 0,
        //     elevation: 0,
        //     height: 120,
        //   },
        //   headerTintColor: colors.green,
        // }}
        initialRouteName="Home"
      >
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home" 
          component={Home} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
};

export default RootStack;