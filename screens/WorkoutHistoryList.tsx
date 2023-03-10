import { FunctionComponent, useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import styled from "styled-components/native";

// firebase
import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import "firebase/compat/firestore";
const { firestore, auth } = firebase;

// helpers
import { onSnapshot } from "../helpers/databaseHelpers";

// custom components
import { Container } from "../components/shared";
import RegularButton from "../components/buttons/RegularButton";
import { colors } from "../components/colors";

// navigation
import { RootStackParamList } from "../navigators/RootStack"
import { NativeStackScreenProps } from "@react-navigation/native-stack";
type Props = NativeStackScreenProps<RootStackParamList, "WorkoutHistoryList">;

const WorkoutHistoryListContainer = styled(Container)`
`;

const WorkoutHistoryList: FunctionComponent<Props> = ({ navigation }) => {
  const [workoutHistoryList, setWorkoutHistoryList] = useState([]);

  const listsRef = firestore()
    .collection('users')
    .doc(auth()
      .currentUser?.uid)
    .collection('workoutHistory');


  useEffect(() => {
    onSnapshot(
      listsRef,
      (newlist: any) => { setWorkoutHistoryList(newlist) },
      {
        sort: (a: { date: string; }, b: { date: string; }) => {
          const dateA = new Date(a);
          const dateB = new Date(b);
          return dateA - dateB;
        }
      }
    )
  }, []);

  console.log('listsRef', workoutHistoryList);

  const listItems = workoutHistoryList.map((historyItem, i) => {
    return (
      <RegularButton
        key={i + 10000}
        onPress={() => { }}
        btnStyles={{ width: '90%', marginTop: 20, backgroundColor: colors.blue }}
      >
        {historyItem.id}
      </RegularButton>
    );
  })
  return (
    <WorkoutHistoryListContainer>
      <StatusBar style="light" />
      {listItems}
    </WorkoutHistoryListContainer>
  )
};

export default WorkoutHistoryList;