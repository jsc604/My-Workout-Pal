import { FunctionComponent, useState } from "react";
import { StatusBar } from "expo-status-bar";
import styled from "styled-components/native";
import { TextInput, ScrollView } from "react-native";
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
type Props = NativeStackScreenProps<RootStackParamList, "CreateWorkout">;

const CreateWorkoutContainer = styled(Container)`
`;

const WorkoutInputs = styled(Container)`
  margin-top: 20px;
  margin-bottom: auto;
  flex-direction: row;
  align-items: start;
  justify-content: center;
  width: 50%;
  height: fit;
  flex: 0.2;
  z-index: 2;
`;

const ExerciseContainer = styled(Container)`
  flex-direction: row;
  align-items: start;
  z-index: 1;
 
`;

const ExerciseInput = styled(TextInput)`
  width: 50px;
  height: 40px;
  border: 1px solid ${colors.black};
  border-radius: 5px;
  margin-left: 10px;
  margin-right: 10px;
  text-align: center;
  font-size: 16px;
`;

interface Exercise {
  exercise: string;
  sets: number;
  reps: number;
}

const CreateWorkout: FunctionComponent<Props> = ({ navigation }) => {
  const [workoutName, setWorkoutName] = useState('something');
  const [open, setOpen] = useState(false);
  const [exercise, setExercise] = useState<string[]>([]);
  const [workoutData, setWorkoutData] = useState<Exercise[]>([]);

  const handleAddExercises = () => {
    const newWorkoutData = exercise.map(exercise => ({exercise, sets: 0, reps: 0}));
    setWorkoutData(prevData => [...prevData, ...newWorkoutData]);
  };

  return (
    <CreateWorkoutContainer>
      <StatusBar style="light" />
      <TextInput
          onChangeText={setWorkoutName}
          placeholder="Enter workout name"
          style={{marginTop: 20, fontSize: 20, borderColor: 'black', borderWidth: 1, borderRadius: 6 }}
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
            fontSize: 16
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
        btnStyles={{width: '40%', marginLeft: 20}}
        >
          Add
        </RegularButton>
      </WorkoutInputs>

      <BigText>{workoutName}</BigText>
      
      {workoutData.map((item, index) => (
        <ExerciseContainer key={index}>
          <RegularText>{item.exercise}</RegularText>
          <TextInput
            onChangeText={(text) => {
              const newExerciseList = [...exercise];
              newExerciseList[index].sets = text;
              setExercise(newExerciseList);
            }}
            value={item.sets.toString()}
            keyboardType="numeric"
            style={{marginLeft: 10}}
          />
          <TextInput
            onChangeText={(text) => {
              const newExerciseList = [...exercise];
              newExerciseList[index].reps = text;
              setExercise(newExerciseList);
            }}
            value={item.reps.toString()}
            keyboardType="numeric"
            style={{marginLeft: 10}}
          />
        </ExerciseContainer>))}

      <RegularButton
        onPress={() => { }}
        btnStyles={{ marginTop: 'auto', marginBottom: 30, width: '70%' }}
        textStyles={{ fontSize: 20 }}
      >
        <strong>Create Workout</strong>
      </RegularButton>

    </CreateWorkoutContainer>
  )
};

export default CreateWorkout;
