import { FunctionComponent } from "react";

// screens
import Welcome from "../screens/Welcome";
import Home from "../screens/Home";
import Greeting from "../components/header/Greeting";
import Profile from "../components/header/Profile";
import SplashScreen from "../screens/SplashScreenAnimation";
import SelectWorkout from "../screens/SelectWorkout";
import CreateWorkout from "../screens/CreateWorkout";
import EditWorkout from "../screens/EditWorkout";
import StartWorkout from "../screens/StartWorkout";

// react navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// custom components
import { colors } from "../components/colors";

export type RootStackParamList = {
  SplashScreen: undefined;
  Welcome: undefined;
  Home: undefined;
  SelectWorkout: undefined;
  CreateWorkout: undefined;
  EditWorkout: undefined;
  StartWorkout: undefined;
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
              imgContainerStyle={{ marginRight: 10 }}
            />
          )
        }}
        initialRouteName="StartWorkout"
      >
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
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
        <Stack.Screen
          name="SelectWorkout"
          component={SelectWorkout}
          options={{
            headerTitle: (props) => (
              <Greeting
                mainText="Select Workout"
                {...props}
              />
            ),
            headerTitleAlign: 'center'
          }}
        />
        <Stack.Screen
          name="CreateWorkout"
          component={CreateWorkout}
          options={{
            headerTitle: (props) => (
              <Greeting
                mainText="Create Workout"
                {...props}
              />
            ),
            headerTitleAlign: 'center'
          }}
        />
        <Stack.Screen
          name="EditWorkout"
          component={EditWorkout}
          options={{
            headerTitle: (props) => (
              <Greeting
                mainText="Edit Workout"
                {...props}
              />
            ),
            headerTitleAlign: 'center'
          }}
        />
        <Stack.Screen
          name="StartWorkout"
          component={StartWorkout}
          options={{
            headerTitle: (props) => (
              <Greeting
                mainText="Start Workout"
                {...props}
              />
            ),
            headerTitleAlign: 'center'
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
};

export default RootStack;