import { FunctionComponent, useState, useEffect, useContext } from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// react navigation
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StackActions, useNavigation } from "@react-navigation/native";

// screens
import Welcome from "../screens/Welcome";
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

export type RootStackParamList = {
  SplashScreen: undefined;
  Welcome: undefined;
  Home: undefined;
  SelectWorkout: undefined;
  CreateWorkout: undefined;
  EditWorkout: { name: string, exercises: ExerciseBlock[] };
  StartWorkout: { name: string, exercises: ExerciseBlock[] };
  Settings: undefined;
  WorkoutHistoryList: undefined;
  WorkoutHistoryItem: { date: string, workoutName: string, completedSets: ExerciseCluster[], fromHistory: boolean };
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
        headerTintColor: darkMode ? 'white' : colors.black,
        headerStyle: {
          backgroundColor: darkMode ? '#2d2d30' : 'white',
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
        options={({ route, navigation }) => {
          return route.params.fromHistory ?
            ({
              headerTitle: (props) => (
                <Greeting
                  mainText={`${route.params.date}`}
                  {...props}
                />
              ),
              headerTitleAlign: 'center',
            })
            :
            ({
              headerTitle: (props) => (
                <Greeting
                  mainText={`${route.params.date}`}
                  {...props}
                />
              ),
              headerTitleAlign: 'center',
              headerLeft: () =>
                <TouchableOpacity
                  onPress={() => { navigation.dispatch(StackActions.popToTop()) }}
                  style={{ marginLeft: 15 }}
                >
                  <Ionicons name="arrow-back-outline" size={25} color={ darkMode ? 'white' : colors.black} />
                </TouchableOpacity>
              ,
              headerBackTitleVisible: false,
            })
        }}
      />
    </Stack.Navigator>
  )
};

export default RootStack;