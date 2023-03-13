import { FunctionComponent, useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import styled from "styled-components/native";

// firebase
import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import "firebase/compat/firestore";
const { firestore, auth } = firebase;

// helpers
import { getWorkoutHistory } from "../helpers/databaseHelpers";

// custom components
import { Container } from "../components/shared";
import RegularButton from "../components/buttons/RegularButton";
import { colors } from "../components/colors";

// navigation
import { RootStackParamList } from "../navigators/RootStack"
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { WorkoutHistoryListType } from "../helpers/workoutTypes";
import { ScrollView } from "react-native";
type Props = NativeStackScreenProps<RootStackParamList, "WorkoutHistoryList">;

const WorkoutHistoryListContainer = styled(Container)``;

const WorkoutHistoryList: FunctionComponent<Props> = ({ navigation }) => {
  const [workoutHistoryList, setWorkoutHistoryList] = useState<WorkoutHistoryListType[]>([]);

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

  const listItems = workoutHistoryList.map((historyItem, i) => {
    return (
      <RegularButton
        key={i + 10000}
        onPress={() => {
          navigation.navigate('WorkoutHistoryItem',
            {
              date: historyItem.date,
              workoutName: historyItem.workoutName,
              completedSets: historyItem.completedSets,
            })
        }}
        btnStyles={{ width: '90%', marginTop: 20, backgroundColor: colors.blue }}
      >
        {historyItem.id}
      </RegularButton>
    );
  })
  return (
    <ScrollView>
      <WorkoutHistoryListContainer>
        <StatusBar style="light" />
        {listItems}
      </WorkoutHistoryListContainer>
    </ScrollView>
  )
};

export default WorkoutHistoryList;