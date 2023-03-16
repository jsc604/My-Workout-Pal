import React from "react";
import { FunctionComponent, useState, useEffect, useContext } from "react";
import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";

// firebase
import firebase from '../node_modules/firebase/compat/';
const { firestore, auth } = firebase;

// helpers
import { getWorkoutHistory } from "../helpers/databaseHelpers";
import { alertDelete } from "../helpers/confirmationAlert";

// custom components
import { Container } from "../components/shared";
import { colors } from "../components/colors";
import { DarkModeContext } from "../providers/DarkModeProvider";

// navigation
import { RootStackParamList } from "../navigators/RootStack"
import { NativeStackScreenProps } from "@react-navigation/native-stack";
type Props = NativeStackScreenProps<RootStackParamList, "WorkoutHistoryList">;

// types
import { WorkoutHistoryListType } from "../helpers/workoutTypes";
import RegularText from "../components/texts/RegularText";

const WorkoutHistoryListContainer = styled(Container)``;

const WorkoutHistoryList: FunctionComponent<Props> = ({ navigation }) => {
  const [workoutHistoryList, setWorkoutHistoryList] = useState<WorkoutHistoryListType[]>([]);
  const { darkMode } = useContext(DarkModeContext);

  const listsRef = firestore()
    .collection('users')
    .doc(auth()
      .currentUser?.uid)
    .collection('workoutHistory');


  useEffect(() => {
    getWorkoutHistory(
      listsRef,
      (newList: WorkoutHistoryListType[]) => setWorkoutHistoryList(newList)
    )
  }, []);

  const handleDeleteItem = (id: string, darkMode: boolean) => {
    alertDelete(darkMode, listsRef, id);
  };

  const listItems = workoutHistoryList.map((historyItem, i) => {
    return (
      <TouchableOpacity
        key={i + 10000}
        onPress={() => {
          navigation.navigate('WorkoutHistoryItem',
            {
              date: historyItem.date,
              workoutName: historyItem.workoutName,
              completedSets: historyItem.completedSets,
              fromHistory: true
            })
        }}
        style={styles.row}
      >
        <RegularText textStyles={{ marginLeft: 10 }}>{historyItem.id}</RegularText>
        <TouchableOpacity
          onPress={() => { handleDeleteItem(historyItem.id, darkMode) }}
          style={{ width: 40, height: 40, justifyContent: 'center', alignItems: 'center', marginLeft: 5, }}
        >
          <Ionicons name="trash-outline" size={30} color={colors.red} />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  })

  if (workoutHistoryList.length < 1) {
    return (
      <WorkoutHistoryListContainer style={{ backgroundColor: darkMode ? '#2d2d30' : 'white' }}>
        <StatusBar style={darkMode ? 'dark' : 'light'} />
        <RegularText textStyles={{ marginTop: 'auto', color: colors.black }}>
          You have not completed
        </RegularText>
        <RegularText textStyles={{ marginBottom: 'auto', color: colors.black }}>
          any workouts
        </RegularText>
      </WorkoutHistoryListContainer>
    )
  };

  return (
    <ScrollView style={{ backgroundColor: darkMode ? '#2d2d30' : 'white', flex: 1 }}>
      <WorkoutHistoryListContainer style={{ backgroundColor: darkMode ? '#2d2d30' : 'white', flex: 1 }}>
        <StatusBar style={darkMode ? 'dark' : 'light'} />
        {listItems}
      </WorkoutHistoryListContainer>
    </ScrollView>
  )
};

const styles = StyleSheet.create({
  row: {
    width: '90%',
    marginTop: 20,
    backgroundColor: colors.blue,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 10,
    alignItems: 'center',
    padding: 10,
  },
});

export default WorkoutHistoryList;