import { FunctionComponent, useState } from "react";
import { StatusBar } from "expo-status-bar";
import styled from "styled-components/native";
import { TextInput, ScrollView, View } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';

// firebase
import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import "firebase/compat/firestore";
const { firestore, auth } = firebase;

// custom components
import { Container } from "../components/shared";
import RegularButton from "../components/buttons/RegularButton";
import { colors } from "../components/colors";
import { sampleExercises } from "../assets/workouts/exercises";
import BigText from "../components/texts/BIgText";
import RegularText from "../components/texts/RegularText";

// navigation
import { RootStackParamList } from "../navigators/RootStack"
import { NativeStackScreenProps } from "@react-navigation/native-stack";
type Props = NativeStackScreenProps<RootStackParamList, "EditWorkout">;

// types
import { ExerciseBlock } from "../helpers/workoutTypes";

// helpers
import { updateDoc } from "../helpers/databaseHelpers";

const EditWorkoutContainer = styled(Container)`
`;

const WorkoutInputs = styled(Container)`
  margin: 20px auto;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 60%;
  height: fit;
  flex: 0.1;
  z-index: 2;
`;

const ExerciseInput = styled(TextInput)`
  height: 40px;
  border: 1px solid ${colors.black};
  border-radius: 5px;
  text-align: center;
  font-size: 16px;
`;

const EditWorkout: FunctionComponent<Props> = ({ navigation, route }) => {
  const { name, exercises } = route.params;
  
  const workoutExercises = exercises.map((item) => {
    return item.exercise;
  })

  const [workoutName, setWorkoutName] = useState(name);
  const [open, setOpen] = useState(false);
  const [exercise, setExercise] = useState<string[]>(workoutExercises);
  const [workoutData, setWorkoutData] = useState<ExerciseBlock[]>(exercises);

  const listsRef = firestore()
    .collection('users')
    .doc(auth()
      .currentUser?.uid)
    .collection('workouts');

  const updateWorkout = (name: string, exercises: ExerciseBlock[]) => {
    updateDoc(listsRef, name, { exercises });
  };

  type ExerciseArray = Array<ExerciseBlock>;

  const handleAddExercises = () => {
    const newWorkoutData = exercise.reduce((acc: ExerciseArray, exercise) => {
      const existingExercise = workoutData.find(item => item.exercise === exercise);
      if (existingExercise) {
        acc.push(existingExercise);
      } else {
        acc.push({ exercise, sets: 0, reps: 0 });
      }
      return acc;
    }, []);

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

  const workoutDataRow = workoutData.map((item, i) => {
    return (
      <View key={i + 600} style={{ flexDirection: 'row', width: '100%', marginTop: 10, alignItems: 'center' }}>
        <RegularText textStyles={{ width: '50%' }}>{item.exercise}</RegularText>
        <ExerciseInput
          style={{ width: '20%', margin: 'auto' }}
          onChangeText={(value) => handleSetChange(i, parseInt(value))}
          placeholder={`${item.sets}`}
          keyboardType='numeric' />
        <ExerciseInput
          style={{ width: '20%', margin: 'auto' }}
          onChangeText={(value) => handleRepChange(i, parseInt(value))}
          placeholder={`${item.reps}`}
          keyboardType='numeric' />
      </View>
    )
  });

  return (
    <EditWorkoutContainer>
      <StatusBar style="light" />
      <TextInput
        onChangeText={setWorkoutName}
        placeholder="Update workout name"
        style={{ marginTop: 20, fontSize: 20, borderColor: 'black', borderWidth: 1, borderRadius: 6 }}
      />
      <WorkoutInputs>
        <DropDownPicker
          items={sampleExercises.map(exercise => ({
            label: exercise.label,
            value: exercise.label
          }))}
          multiple={true}
          placeholder="Select exercises"
          labelStyle={{
            textAlign: 'left',
            fontSize: 20
          }}
          setValue={setExercise}
          searchable={true}
          value={exercise}
          open={open}
          setOpen={setOpen}
          mode={"BADGE"}
        />
        <RegularButton
          onPress={handleAddExercises}
          btnStyles={{ width: '30%', marginLeft: 20 }}
        >
          +
        </RegularButton>
      </WorkoutInputs>

      {workoutName && <BigText>{workoutName}</BigText>}

      {workoutData.length > 0 &&
        (<ScrollView style={{ width: "90%", flex: 1, marginBottom: 20 }}>
          <View style={{ alignItems: "center" }}>
            <View style={{ flexDirection: 'row', width: '100%', borderBottomWidth: 1, marginTop: 10 }}>
              <RegularText textStyles={{ width: '50%' }}>Exercise</RegularText>
              <RegularText textStyles={{ width: '25%', textAlign: 'center' }}>Sets</RegularText>
              <RegularText textStyles={{ width: '25%', textAlign: 'center' }}>Reps</RegularText>
            </View>
            {workoutDataRow}
          </View>
        </ScrollView>)}

      <RegularButton
        onPress={() => {
          updateWorkout(workoutName, workoutData);
          navigation.navigate('SelectWorkout');
        }}
        btnStyles={{ marginTop: 'auto', marginBottom: 30, width: '70%' }}
        textStyles={{ fontWeight: 'bold' }}
      >
        Update Workout
      </RegularButton>

    </EditWorkoutContainer>
  )
};

export default EditWorkout;