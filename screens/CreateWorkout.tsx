import { FunctionComponent, useState } from "react";
import { StatusBar } from "expo-status-bar";
import styled from "styled-components/native";
import { TextInput, ScrollView, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// custom components
import { Container } from "../components/shared";
import RegularButton from "../components/buttons/RegularButton";
import { colors } from "../components/colors";
import RegularText from "../components/texts/RegularText";

// firebase
import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import "firebase/compat/firestore";
const { firestore, auth } = firebase;

// navigation
import { RootStackParamList } from "../navigators/RootStack"
import { NativeStackScreenProps } from "@react-navigation/native-stack";
type Props = NativeStackScreenProps<RootStackParamList, "CreateWorkout">;

// helpers
import { addNewWorkoutDoc } from "../helpers/databaseHelpers";

// types
import { ExerciseBlock } from "../helpers/workoutTypes";

const CreateWorkoutContainer = styled(Container)``;

const ExerciseInput = styled(TextInput)`
  height: 40px;
  border: 1px solid ${colors.black};
  border-radius: 5px;
  text-align: center;
  font-size: 16px;
`;

const CreateWorkout: FunctionComponent<Props> = ({ navigation }) => {
  const [workoutName, setWorkoutName] = useState('');
  const [workoutData, setWorkoutData] = useState<ExerciseBlock[]>([]);

  const listsRef = firestore()
    .collection('users')
    .doc(auth()
      .currentUser?.uid)
    .collection('workouts');

  const addWorkout = (name: string, exercises: ExerciseBlock[]) => {
    addNewWorkoutDoc(listsRef, name, { exercises })
  };

  const handleAddRow = () => {
    setWorkoutData(prevData => [...prevData, { exercise: '', sets: 0, reps: 0 }]);
  };

  const handleExerciseChange = (index: number, value: string) => {
    const newWorkoutData = [...workoutData];
    newWorkoutData[index].exercise = value;
    setWorkoutData(newWorkoutData);
  };
  const handleSetChange = (index: number, value: number) => {
    const newWorkoutData = [...workoutData];
    newWorkoutData[index].sets = value;
    setWorkoutData(newWorkoutData);
  };

  const handleRepChange = (index: number, value: number) => {
    const newWorkoutData = [...workoutData];
    newWorkoutData[index].reps = value;
    setWorkoutData(newWorkoutData);
  };

  const handleDeleteRow = (index: number) => {
    const newWorkoutData = [...workoutData];
    newWorkoutData.splice(index, 1);
    setWorkoutData(newWorkoutData);
  };

  const workoutDataRow = workoutData.map((item, i) => {
    return (
      <View key={i + 200} style={{ flexDirection: 'row', width: '100%', marginTop: 10, alignItems: 'center', justifyContent: 'space-between' }}>
        <ExerciseInput style={{ width: '50%' }} placeholder='Exercise' onChangeText={(value) => handleExerciseChange(i, value)} />
        <ExerciseInput style={{ width: '18%', margin: 'auto' }} onChangeText={(value) => handleSetChange(i, parseInt(value))} placeholder='0' keyboardType='numeric' />
        <ExerciseInput style={{ width: '18%', margin: 'auto' }} onChangeText={(value) => handleRepChange(i, parseInt(value))} placeholder='0' keyboardType='numeric' />
        <TouchableOpacity onPress={() => handleDeleteRow(i)}>
          <Ionicons name="trash-outline" size={30} color="red" />
        </TouchableOpacity>
      </View>
    )
  });

  return (
    <CreateWorkoutContainer>
      <StatusBar style="light" />
      <TextInput
        onChangeText={setWorkoutName}
        placeholder="Enter workout name"
        style={{ marginTop: 20, fontSize: 20, borderColor: 'black', borderWidth: 1, borderRadius: 6 }}
      />

      <ScrollView style={{ width: "90%", flex: 1, marginBottom: 20 }}>
        <View style={{ alignItems: "center" }}>
          <View style={{ flexDirection: 'row', width: '100%', borderBottomWidth: 1, marginTop: 10, justifyContent: 'space-between' }}>
            <RegularText textStyles={{ width: '50%' }}>Exercise</RegularText>
            <RegularText textStyles={{ width: '20%', textAlign: 'center' }}>Sets</RegularText>
            <RegularText textStyles={{ width: '20%', textAlign: 'center' }}>Reps</RegularText>
            <RegularText textStyles={{ width: '10%', textAlign: 'center' }}>-</RegularText>
          </View>
          {workoutDataRow}
        </View>
        <TouchableOpacity
          onPress={handleAddRow}
          style={{ marginVertical: 20, width: 'fit-content', borderRadius: 999, marginHorizontal: 'auto' }}
        >
          <Ionicons name="add-circle-outline" size={50} color={colors.black} />
        </TouchableOpacity>
      </ScrollView>

      <RegularButton
        onPress={() => {
          addWorkout(workoutName, workoutData);
          navigation.navigate('SelectWorkout');
        }}
        btnStyles={{ marginTop: 'auto', marginBottom: 30, width: '90%' }}
        textStyles={{ fontWeight: 'bold' }}
      >
        Create Workout
      </RegularButton>

    </CreateWorkoutContainer>
  )
};

export default CreateWorkout;