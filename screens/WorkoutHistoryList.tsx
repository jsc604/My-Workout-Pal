import { FunctionComponent, useState, useEffect, useContext } from "react";
import { StatusBar } from "expo-status-bar";
import { ScrollView } from "react-native";
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
import { DarkModeContext } from "../providers/DarkModeProvider";

// navigation
import { RootStackParamList } from "../navigators/RootStack"
import { NativeStackScreenProps } from "@react-navigation/native-stack";
type Props = NativeStackScreenProps<RootStackParamList, "WorkoutHistoryList">;

// types
import { WorkoutHistoryListType } from "../helpers/workoutTypes";

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
    <ScrollView style={{ backgroundColor: darkMode ? '#2d2d30' : 'white', flex: 1 }}>
      <WorkoutHistoryListContainer style={{ backgroundColor: darkMode ? '#2d2d30' : 'white', flex: 1 }}>
        <StatusBar style={darkMode ? 'dark' : 'light'} />
        {listItems}
      </WorkoutHistoryListContainer>
    </ScrollView>
  )
};

export default WorkoutHistoryList;