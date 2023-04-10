import React, { FunctionComponent, useState, useEffect, useContext } from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// react navigation
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StackActions, useNavigation } from "@react-navigation/native";

// screens
import Home from "../screens/Home";
import Greeting from "../components/header/Greeting";
import SplashScreen from "../screens/SplashScreenAnimation";
import SelectWorkout from "../screens/SelectWorkout";
import CreateWorkout from "../screens/CreateWorkout";
import EditWorkout from "../screens/EditWorkout";
import StartWorkout from "../screens/StartWorkout";
import Settings from "../screens/Settings";
import SettingsButton from "../components/header/SettingsButton";
import WorkoutHistoryList from "../screens/WorkoutHistoryList";
import WorkoutHistoryItem from "../screens/WorkoutHistoryItem";

// custom components
import { colors } from "../components/colors";
import { DarkModeContext } from "../providers/DarkModeProvider";

// helpers
import { getName } from "../helpers/databaseHelpers";
import { ExerciseBlock, ExerciseCluster } from "../helpers/workoutTypes";
import EditHistoryItem from "../screens/EditHistoryItem";

export type RootStackParamList = {
  SplashScreen: undefined;
  Home: undefined;
  SelectWorkout: undefined;
  CreateWorkout: undefined;
  EditWorkout: { name: string, exercises: ExerciseBlock[] };
  StartWorkout: { name: string, exercises: ExerciseBlock[] };
  Settings: undefined;
  WorkoutHistoryList: undefined;
  WorkoutHistoryItem: { date: string, workoutName: string, completedSets: ExerciseCluster[] };
  EditHistoryItem: { date: string, workoutName: string, completedSets: ExerciseCluster[], oldDoc: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStack: FunctionComponent = () => {
  const navigation = useNavigation();
  const [name, setName] = useState<string>('');
  const { darkMode } = useContext(DarkModeContext);

  useEffect(() => {
    const getNameFromDB = async () => {
      const name = await getName();
      setName(name);
    };
    getNameFromDB();
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: darkMode ? colors.white :colors.black,
        headerStyle: {
          backgroundColor: darkMode ? colors.black : 'white',
        },
        headerRight: () => (
          <SettingsButton navigation={navigation} />
        )
      }}
      initialRouteName="Home"
    >
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerTitle: (props) => (
            <Greeting
              mainText={`Hey ${name}`}
              subText="Welcome back!"
              {...props}
            />
          ),
          headerLeft: () => <></>,
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
        options={({ route }) => {
          return ({
            headerTitle: (props) => (
              <Greeting
                mainText={`Edit ${route.params.name}`}
                {...props}
              />
            ),
            headerTitleAlign: 'center'
          })
        }}
      />
      <Stack.Screen
        name="StartWorkout"
        component={StartWorkout}
        options={({ route }) => {
          return ({
            headerTitle: (props) => (
              <Greeting
                mainText={`Start ${route.params.name}`}
                {...props}
              />
            ),
            headerTitleAlign: 'center'
          })
        }}
      />
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{
          headerTitle: (props) => (
            <Greeting
              mainText="Settings"
              {...props}
            />
          ),
          headerTitleAlign: 'center'
        }}
      />
      <Stack.Screen
        name="WorkoutHistoryList"
        component={WorkoutHistoryList}
        options={{
          headerTitle: (props) => (
            <Greeting
              mainText="Workout History"
              {...props}
            />
          ),
          headerTitleAlign: 'center'
        }}
      />
      <Stack.Screen
        name="WorkoutHistoryItem"
        component={WorkoutHistoryItem}
        options={({ route }) => {
          return ({
            headerTitle: (props) => (
              <Greeting
                mainText={`${route.params.date}`}
                {...props}
              />
            ),
            headerTitleAlign: 'center'
          })
        }}
      />
      <Stack.Screen
        name="EditHistoryItem"
        component={EditHistoryItem}
        options={({ route }) => {
          return ({
            headerTitle: (props) => (
              <Greeting
                mainText={`Edit ${route.params.workoutName}`}
                {...props}
              />
            ),
            headerTitleAlign: 'center'
          })
        }}
      />
    </Stack.Navigator>
  )
};

export default RootStack;