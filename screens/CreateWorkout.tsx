// import { FunctionComponent, useState } from "react";
// import { StatusBar } from "expo-status-bar";
// import styled from "styled-components/native";
// import { TextInput, ScrollView, View } from "react-native";
// import DropDownPicker from 'react-native-dropdown-picker';
// import { DataTable } from 'react-native-paper';

// // custom components
// import { Container } from "../components/shared";
// import RegularButton from "../components/buttons/RegularButton";
// import { colors } from "../components/colors";
// import { exercises } from "../assets/workouts/exercises";
// import BigText from "../components/texts/BIgText";
// import RegularText from "../components/texts/RegularText";

// // navigation
// import { RootStackParamList } from "../navigators/RootStack"
// import { NativeStackScreenProps } from "@react-navigation/native-stack";
// type Props = NativeStackScreenProps<RootStackParamList, "CreateWorkout">;

// const CreateWorkoutContainer = styled(Container)`
// `;

// const WorkoutInputs = styled(Container)`
//   margin-top: 20px;
//   margin-bottom: auto;
//   flex-direction: row;
//   align-items: start;
//   justify-content: center;
//   width: 50%;
//   height: fit;
//   flex: 0.2;
//   z-index: 2;
// `;

// const ExerciseInput = styled(TextInput)`
//   width: 50px;
//   height: 40px;
//   border: 1px solid ${colors.black};
//   border-radius: 5px;
//   // margin-left: 10px;
//   // margin-right: 10px;
//   text-align: center;
//   font-size: 16px;
// `;

// interface Exercise {
//   exercise: string;
//   sets: number;
//   reps: number;
// }

// const CreateWorkout: FunctionComponent<Props> = ({ navigation }) => {
//   const [workoutName, setWorkoutName] = useState('something');
//   const [open, setOpen] = useState(false);
//   const [exercise, setExercise] = useState<string[]>([]);
//   const [workoutData, setWorkoutData] = useState<Exercise[]>([]);

//   const handleAddExercises = () => {
//     const newWorkoutData = exercise.map(exercise => ({ exercise, sets: 0, reps: 0 }));
//     setWorkoutData(newWorkoutData);
//   };

//   const handleSetChange = (index: number, value: number) => {
//     const newWorkoutData = [...workoutData];
//     newWorkoutData[index].sets = value;
//     setWorkoutData(newWorkoutData);
//   };

//   const handleRepChange = (index: number, value: number) => {
//     const newWorkoutData = [...workoutData];
//     newWorkoutData[index].reps = value;
//     setWorkoutData(newWorkoutData);
//   };

//   const workoutDataRow = workoutData.map((item, i) => {
//     return (
//       <DataTable.Row key={i}>
//         <RegularText textStyles={{ marginRight: 'auto', width: '50%' }}>{item.exercise}</RegularText>
//         <DataTable.Cell numeric style={{alignItems: 'center'}}>
//           <ExerciseInput
//             value={item.sets.toString()}
//             onChangeText={(value) => handleSetChange(i, parseInt(value))}
//           />
//         </DataTable.Cell>
//         <DataTable.Cell numeric style={{alignItems: 'center'}}>
//           <ExerciseInput
//             value={item.reps.toString()}
//             onChangeText={(value) => handleRepChange(i, parseInt(value))}
//           />
//         </DataTable.Cell>
//       </DataTable.Row>
//     )
//   });

//   return (
//     <CreateWorkoutContainer>
//       <StatusBar style="light" />
//       <TextInput
//         onChangeText={setWorkoutName}
//         placeholder="Enter workout name"
//         style={{ marginTop: 20, fontSize: 20, borderColor: 'black', borderWidth: 1, borderRadius: 6 }}
//       />
//       <WorkoutInputs>
//         <DropDownPicker
//           items={exercises.map(exercise => ({
//             label: exercise.label,
//             value: exercise.label
//           }))}
//           multiple={true}
//           placeholder="Select exercises"
//           labelStyle={{
//             textAlign: 'left',
//             fontSize: 16
//           }}
//           setValue={setExercise}
//           searchable={true}
//           value={exercise}
//           open={open}
//           setOpen={setOpen}
//           mode={"BADGE"}
//         />
//         <RegularButton
//           onPress={handleAddExercises}
//           btnStyles={{ width: '30%', marginLeft: 20 }}
//         >
//           +
//         </RegularButton>
//       </WorkoutInputs>

//       <ScrollView style={{ width: "80%", flex: 1 }}>
//         <View style={{ alignItems: "center" }}>
//           <BigText>{workoutName}</BigText>

//           <DataTable>
//             <DataTable.Header>
//               <DataTable.Title style={{ justifyContent: 'flex-start' }}>Exercise</DataTable.Title>
//               <DataTable.Title style={{ justifyContent: 'flex-end' }} numeric>Sets</DataTable.Title>
//               <DataTable.Title style={{ justifyContent: 'flex-end' }} numeric>Reps</DataTable.Title>
//             </DataTable.Header>
//             {workoutDataRow}
//           </DataTable>

//         </View>
//       </ScrollView>
//       <RegularButton
//         onPress={() => { }}
//         btnStyles={{ marginTop: 'auto', marginBottom: 30, width: '70%' }}
//         textStyles={{ fontSize: 20 }}
//       >
//         <strong>Create Workout</strong>
//       </RegularButton>

//     </CreateWorkoutContainer>
//   )
// };

// export default CreateWorkout;

import { FunctionComponent, useState } from "react";
import { StatusBar } from "expo-status-bar";
import styled from "styled-components/native";
import { TextInput, ScrollView, View } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
import { DataTable } from 'react-native-paper';

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

const ExerciseInput = styled(TextInput)`
  width: 50px;
  height: 40px;
  border: 1px solid ${colors.black};
  border-radius: 5px;
  // margin-left: 10px;
  // margin-right: 10px;
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
    const newWorkoutData = exercise.map(exercise => ({ exercise, sets: 0, reps: 0 }));
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
      <DataTable.Row key={i}>
        <RegularText textStyles={{ marginRight: 'auto', width: '50%' }}>{item.exercise}</RegularText>
        <DataTable.Cell numeric style={{alignItems: 'center'}}>
          <ExerciseInput
            value={item.sets.toString()}
            onChangeText={(value) => handleSetChange(i, parseInt(value))}
          />
        </DataTable.Cell>
        <DataTable.Cell numeric style={{alignItems: 'center'}}>
          <ExerciseInput
            value={item.reps.toString()}
            onChangeText={(value) => handleRepChange(i, parseInt(value))}
          />
        </DataTable.Cell>
      </DataTable.Row>
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
          btnStyles={{ width: '30%', marginLeft: 20 }}
        >
          +
        </RegularButton>
      </WorkoutInputs>

      <ScrollView style={{ width: "80%", flex: 1 }}>
        <View style={{ alignItems: "center" }}>
          <BigText>{workoutName}</BigText>

          <DataTable>
            <DataTable.Header>
              <DataTable.Title style={{ justifyContent: 'flex-start' }}>Exercise</DataTable.Title>
              <DataTable.Title style={{ justifyContent: 'flex-end' }} numeric>Sets</DataTable.Title>
              <DataTable.Title style={{ justifyContent: 'flex-end' }} numeric>Reps</DataTable.Title>
            </DataTable.Header>
            {workoutDataRow}
          </DataTable>

        </View>
      </ScrollView>
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