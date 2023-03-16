import React, { FunctionComponent, useContext, useState } from "react";
import styled from "styled-components";
import { StatusBar } from "expo-status-bar";
import { ScrollView, View, TextInput, StyleSheet } from "react-native";
import Swal from "sweetalert2";

// custom components
import { Container } from "../components/shared";
import { colors } from "../components/colors";
import RegularButton from "../components/buttons/RegularButton";
import RegularText from "../components/texts/RegularText";
import Stopwatch from "../components/Stopwatch";
import { DarkModeContext } from "../providers/DarkModeProvider";

// navigation
import { RootStackParamList } from "../navigators/RootStack"
import { NativeStackScreenProps } from "@react-navigation/native-stack";
type Props = NativeStackScreenProps<RootStackParamList, "StartWorkout">;

// firebase
import firebase from '../node_modules/firebase/compat/';
const { firestore, auth } = firebase;

// helpers
import { formatWorkout } from "../helpers/formatWorkout";
import { addNewWorkoutHistoryDoc } from "../helpers/databaseHelpers";
const currentDate = new Date();
const formattedDate = currentDate.toLocaleDateString("en-US",
  { month: "short", day: "2-digit", year: "numeric" });

// types
import { ExerciseCluster } from "../helpers/workoutTypes";

const StartWorkoutContainer = styled(Container)``;

const StartWorkout: FunctionComponent<Props> = ({ navigation, route }) => {
  const { name, exercises } = route.params;
  const { darkMode } = useContext(DarkModeContext);
  const formattedWorkout = formatWorkout(exercises);

  const [completedWorkout, setCompletedWorkout] = useState<ExerciseCluster[]>(formattedWorkout);

  const styles = StyleSheet.create({
    input: {
      height: 40,
      borderRadius: 5,
      borderWidth: 1,
      textAlign: 'center',
      fontSize: 16,
      width: '30%',
      margin: 'auto',
      color: darkMode ? 'white' : 'black',
      borderColor: darkMode ? 'white' : 'black',
      marginLeft: 10,
      opacity: 0.8
    },
    workoutHeader: {
      width: '20%',
      textAlign: 'center',
      fontSize: 18,
      fontWeight: 'bold',
      color: darkMode ? 'white' : 'black',
    }
  });

  const listsRef = firestore()
    .collection('users')
    .doc(auth()
      .currentUser?.uid)
    .collection('workoutHistory');

  const addHistory = (date: string, name: string, completedSets: ExerciseCluster[]) => {
    addNewWorkoutHistoryDoc(listsRef, date, name, completedSets);
  }

  const alertComplete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Make sure you have completed all your sets!",
      icon: "warning",
      iconColor: colors.orange,
      showCancelButton: true,
      confirmButtonColor: "green",
      cancelButtonColor: "red",
      confirmButtonText: "Yes, complete it!",
      reverseButtons: true,
      background: darkMode ? "#2d2d30" : "white",
      color: darkMode ? "white" : "black",
    }).then((result) => {
      if (result.isConfirmed) {
        addHistory(formattedDate, name, completedWorkout);
        navigation.navigate('WorkoutHistoryItem', {
          date: formattedDate,
          workoutName: name,
          completedSets: completedWorkout,
          fromHistory: false
        });
        Swal.fire({
          title: "Good Job!",
          text: "Your workout has been recorded.",
          icon: "success",
          iconColor: "#77DD77",
          confirmButtonColor: "green",
          background: darkMode ? "#2d2d30" : "white",
          color: darkMode ? "white" : "black",
        });
      }
    });
  };

  const workoutDataRow = exercises.map((item, i) => {

    const handleRepChange = (exerciseName: string, setIndex: number, reps: number) => {
      const updatedExerciseSetIndex = completedWorkout.findIndex((exerciseSet) => exerciseSet.exercise === exerciseName);
      if (updatedExerciseSetIndex > -1) {
        completedWorkout[updatedExerciseSetIndex].sets[setIndex - 1].reps = reps;
        setCompletedWorkout([...completedWorkout]);
      }
    };

    const handleWeightChange = (exerciseName: string, setIndex: number, weight: number) => {
      const updatedExerciseSetIndex = completedWorkout.findIndex((exerciseSet) => exerciseSet.exercise === exerciseName);
      if (updatedExerciseSetIndex > -1) {
        completedWorkout[updatedExerciseSetIndex].sets[setIndex - 1].weight = weight;
        setCompletedWorkout([...completedWorkout]);
      }
    };

    const sets = [];
    for (let j = 1; j <= item.sets; j++) {
      sets.push(
        <View key={i + j} style={{ flexDirection: 'row', width: '100%', marginTop: 10, alignItems: 'center', justifyContent: 'center' }}>
          <RegularText textStyles={{ width: '40%', textAlign: 'left', color: darkMode ? 'white' : 'black', }}>{j === 1 ? item.exercise : null}</RegularText>
          <View style={{ flexDirection: 'row', width: '60%' }}>
            <RegularText textStyles={{ margin: 'auto', textAlign: 'center', width: '30%', color: darkMode ? 'white' : 'black', }}>{j}</RegularText>
            <TextInput style={styles.input} onChangeText={(reps) => { handleRepChange(item.exercise, j, parseInt(reps)) }} placeholder={`${item.reps}`} keyboardType='numeric' />
            <TextInput style={styles.input} onChangeText={(weight) => { handleWeightChange(item.exercise, j, parseInt(weight)) }} placeholder='0' keyboardType='numeric' />
          </View>
        </View>
      );
    }
    return (
      <View key={i + 800} style={{ borderBottomWidth: 1, borderColor: darkMode ? 'white' : 'black', paddingBottom: 10, width: '100%' }}>
        {sets}
      </View>
    );
  });

  return (
    <StartWorkoutContainer style={{ flex: 1, alignItems: 'center', backgroundColor: darkMode ? '#2d2d30' : 'white' }}>

      <StatusBar style={darkMode ? 'dark' : 'light'} />
      <Stopwatch />

      <View style={{ flexDirection: 'row', width: '90%', borderBottomWidth: 1, marginTop: 10, borderColor: darkMode ? 'white' : 'black' }}>
        <RegularText textStyles={{ width: '40%', fontSize: 18, fontWeight: 'bold', color: darkMode ? 'white' : 'black', textAlign: 'center' }}>Exercise</RegularText>
        <RegularText textStyles={styles.workoutHeader}>Set</RegularText>
        <RegularText textStyles={styles.workoutHeader}>Reps</RegularText>
        <RegularText textStyles={styles.workoutHeader}>Weight</RegularText>
      </View>

      <ScrollView style={{ width: "90%", flex: 1 }}>
        <View style={{ alignItems: "center" }}>
          {workoutDataRow}
        </View>
      </ScrollView>

      <RegularButton
        onPress={alertComplete}
        btnStyles={{ width: '90%', marginTop: 20, marginBottom: 20, backgroundColor: colors.green }}
        textStyles={{ fontWeight: 'bold' }}
      >
        Complete Workout
      </RegularButton>
    </StartWorkoutContainer>
  )
};

export default StartWorkout;