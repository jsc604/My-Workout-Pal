import { FunctionComponent, useState } from "react";
import { StatusBar } from "expo-status-bar";
import styled from "styled-components/native";
import { TextInput, ScrollView, View } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';

// custom components
import { Container } from "../components/shared";
import RegularButton from "../components/buttons/RegularButton";
import { colors } from "../components/colors";
import { exercises } from "../assets/workouts/exercises";
import BigText from "../components/texts/BIgText";
import RegularText from "../components/texts/RegularText";

// navigation
import { RootStackParamList } from "../navigators/RootStack"
import { NativeStackScreenProps } from "@react-navigation/native-stack";
type Props = NativeStackScreenProps<RootStackParamList, "EditWorkout">;

// workout data
import { workouts } from "../assets/workouts/workouts";
const workoutExercises = workouts[0].exercises.map((item) => {
  return item.exercise;
})

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

interface Exercise {
  exercise: string;
  sets: number;
  reps: number;
}

const EditWorkout: FunctionComponent<Props> = ({ navigation, route }) => {
  const { name } = route.params;

  const [workoutName, setWorkoutName] = useState(name);
  const [open, setOpen] = useState(false);
  const [exercise, setExercise] = useState<string[]>(workoutExercises);
  const [workoutData, setWorkoutData] = useState<Exercise[]>(workouts[0].exercises);


  type ExerciseArray = Array<Exercise>;

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
      <View key={i} style={{ flexDirection: 'row', width: '100%', marginTop: 10, alignItems: 'center' }}>
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
          items={exercises.map(exercise => ({
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
        (<ScrollView style={{ width: "80%", flex: 1, marginBottom: 20 }}>
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
        onPress={
          () => { }
          // console.log({name: workoutName, exercises: workoutData})
        }
        btnStyles={{ marginTop: 'auto', marginBottom: 30, width: '70%' }}
      >
        <strong>Update Workout</strong>
      </RegularButton>

    </EditWorkoutContainer>
  )
};

export default EditWorkout;