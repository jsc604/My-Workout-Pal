import { FunctionComponent } from "react";

// screens
import Welcome from "../screens/Welcome";
import Home from "../screens/Home";

// react navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// custom components
import { colors } from "../components/colors";
import Greeting from "../components/header/Greeting";
import Profile from "../components/header/Profile";

type RootStackParamList = {
  Welcome: undefined;
  Home: undefined;
}

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStack: FunctionComponent = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTintColor: colors.black,     
          headerRight: () => (
            <Profile
              imgContainerStyle={{ backgroundColor: colors.green, marginRight: 10 }}
            />
          )
        }}
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
          options={{
            headerTitle: (props) => (
              <Greeting
                mainText="Hey Bentley,"
                subText="Welcome back!"
                {...props}
              />
            ),
            headerLeft: () => <></>
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
};

export default RootStack;