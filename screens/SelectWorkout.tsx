import { FunctionComponent, SetStateAction, useEffect, useState } from "react";
import { TouchableOpacity, View, Text, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";

// firebase
import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import "firebase/compat/firestore";
const { firestore, auth } = firebase;

// custom components
import { Container } from "../components/shared";
import RegularButton from "../components/buttons/RegularButton";
import RegularText from "../components/texts/RegularText";
import { colors } from "../components/colors";

// navigation
import { RootStackParamList } from "../navigators/RootStack"
import { NativeStackScreenProps } from "@react-navigation/native-stack";
type Props = NativeStackScreenProps<RootStackParamList, "SelectWorkout">;

// helpers
import { onSnapshot, removeDoc } from "../helpers/databaseHelpers";

// types
import { Workout } from "../helpers/workoutTypes";

const SelectWorkoutContainer = styled(Container)`
`;

type WorkoutListArray = Workout[];


const SelectWorkout: FunctionComponent<Props> = ({ navigation }) => {
  const [workoutList, setWorkoutList] = useState<WorkoutListArray>([]);
  const listsRef = firestore()
    .collection('users')
    .doc(auth()
      .currentUser?.uid)
    .collection('workouts');

  useEffect(() => {
    onSnapshot(
      listsRef,
      (newlist: WorkoutListArray) => { setWorkoutList(newlist) },
      { sort: (a: { id: string; }, b: { id: string; }) => a.id.localeCompare(b.id) }
    )
  }, []);

  const removeItemFromList = (id: string) => {
    removeDoc(listsRef, id);
  };

  const workoutListItems = workoutList.map((workout, i) => {
    return (
      <TouchableOpacity
        key={i + 400}
        onPress={() => { navigation.navigate("StartWorkout", { name: workout.id, exercises: workout.exercises }) }}
        style={{ marginTop: 20, backgroundColor: colors.blue, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderRadius: 20, padding: 15 }}
      >
        <Text style={{ fontSize: 20 }}>{workout.id}</Text>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            onPress={() => { navigation.navigate("EditWorkout", { name: workout.id, exercises: workout.exercises}) }}
            style={{ width: 40, height: 40, justifyContent: 'center', alignItems: 'center', margin: 'auto' }}
          >
            <Ionicons name="options-outline" size={30} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => { removeItemFromList(workout.id) }}
            style={{ width: 40, height: 40, justifyContent: 'center', alignItems: 'center', marginLeft: 5 }}
          >
            <Ionicons name="trash-outline" size={30} color="black" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    )
  });

  return (
    <SelectWorkoutContainer>
      <StatusBar style="light" />
      <RegularButton
        onPress={() => { navigation.navigate("CreateWorkout") }}
        btnStyles={{ width: '90%', margin: 20, backgroundColor: colors.green }}
        textStyles={{ fontWeight: 'bold' }}
      >
        Create A New Workout
      </RegularButton>

      {workoutList.length < 1 ?
        <>
          <RegularText textStyles={{ marginTop: 'auto', color: colors.black }}>
            You have no workouts
          </RegularText>
          <RegularText textStyles={{ marginBottom: 'auto', color: colors.black }}>
            Create one to get started
          </RegularText>
        </>
        :
        <ScrollView style={{ width: '90%' }}>
          {workoutListItems}
        </ScrollView>
      }

    </SelectWorkoutContainer>
  )
};

export default SelectWorkout;