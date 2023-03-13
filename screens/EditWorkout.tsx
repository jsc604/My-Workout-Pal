import { FunctionComponent, useState } from "react";
import { StatusBar } from "expo-status-bar";
import styled from "styled-components/native";
import { TextInput, ScrollView, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// firebase
import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import "firebase/compat/firestore";
const { firestore, auth } = firebase;

// custom components
import { Container } from "../components/shared";
import RegularButton from "../components/buttons/RegularButton";
import { colors } from "../components/colors";
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

const ExerciseInput = styled(TextInput)`
  height: 40px;
  border: 1px solid ${colors.black};
  border-radius: 5px;
  text-align: center;
  font-size: 16px;
`;

const EditWorkout: FunctionComponent<Props> = ({ navigation, route }) => {
  const { name, exercises } = route.params;

  const [workoutName, setWorkoutName] = useState(name);
  const [workoutData, setWorkoutData] = useState<ExerciseBlock[]>(exercises);

  const listsRef = firestore()
    .collection('users')
    .doc(auth()
      .currentUser?.uid)
    .collection('workouts');

  const updateWorkout = (name: string, exercises: ExerciseBlock[]) => {
    updateDoc(listsRef, name, { exercises });
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
      <View key={i + 600} style={{ flexDirection: 'row', width: '100%', marginTop: 10, alignItems: 'center' }}>
        <ExerciseInput
          style={{ width: '50%' }}
          onChangeText={(value) => handleExerciseChange(i, value)}
          placeholder={item.exercise} />
        <ExerciseInput
          style={{ width: '18%', margin: 'auto' }}
          onChangeText={(value) => handleSetChange(i, parseInt(value))}
          placeholder={`${item.sets}`}
          keyboardType='numeric' />
        <ExerciseInput
          style={{ width: '18%', margin: 'auto' }}
          onChangeText={(value) => handleRepChange(i, parseInt(value))}
          placeholder={`${item.reps}`}
          keyboardType='numeric' />
        <TouchableOpacity onPress={() => handleDeleteRow(i)}>
          <Ionicons name="trash-outline" size={30} color="red" />
        </TouchableOpacity>
      </View>
    )
  });

  return (
    <EditWorkoutContainer>
      <StatusBar style="light" />
      <TextInput
        onChangeText={setWorkoutName}
        placeholder={workoutName}
        style={{ marginTop: 20, fontSize: 20, borderColor: 'black', borderWidth: 1, borderRadius: 6, textAlign: 'center' }}
      />

      {workoutData.length > 0 &&
        (<ScrollView style={{ width: "90%", flex: 1, marginBottom: 20 }}>
          <View style={{ alignItems: "center" }}>
            <View style={{ flexDirection: 'row', width: '100%', borderBottomWidth: 1, marginTop: 10 }}>
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