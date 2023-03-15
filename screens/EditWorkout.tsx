import { FunctionComponent, useContext, useState } from "react";
import { StatusBar } from "expo-status-bar";
import styled from "styled-components/native";
import { TextInput, ScrollView, View, TouchableOpacity, StyleSheet } from "react-native";
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
import { DarkModeContext } from "../providers/DarkModeProvider";

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
  const { darkMode } = useContext(DarkModeContext);

  const [workoutName, setWorkoutName] = useState(name);
  const [workoutData, setWorkoutData] = useState<ExerciseBlock[]>(exercises);

  const styles = StyleSheet.create({
    input: {
      height: 40,
      borderWidth: 1,
      borderRadius: 5,
      borderColor: darkMode ? 'white' : 'black',
      textAlign: 'center',
      fontSize: 20,
      color: darkMode ? 'white' : 'black',
      opacity: 0.8
    }
  })

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
      <View key={i + 600} style={{ flexDirection: 'row', width: '100%', marginTop: 10, alignItems: 'center', justifyContent: 'space-between' }}>
        <TextInput
          style={{ ...styles.input, width: '50%' }}
          onChangeText={(value) => handleExerciseChange(i, value)}
          placeholder={item.exercise} />
        <TextInput
          style={{ ...styles.input, width: '18%', margin: 'auto' }}
          onChangeText={(value) => handleSetChange(i, parseInt(value))}
          placeholder={`${item.sets}`}
          keyboardType='numeric' />
        <TextInput
          style={{ ...styles.input, width: '18%', margin: 'auto' }}
          onChangeText={(value) => handleRepChange(i, parseInt(value))}
          placeholder={`${item.reps}`}
          keyboardType='numeric' />
        <TouchableOpacity onPress={() => handleDeleteRow(i)} style={{ width: '10%', alignItems: 'center' }}>
          <Ionicons name="trash-outline" size={30} color={colors.red} />
        </TouchableOpacity>
      </View>
    )
  });

  return (
    <EditWorkoutContainer style={{ backgroundColor: darkMode ? '#2d2d30' : 'white' }}>
      <StatusBar style={darkMode ? 'dark' : 'light'} />
      <TextInput
        onChangeText={setWorkoutName}
        placeholder={workoutName}
        style={{ ...styles.input, marginTop: 20, width: '90%' }}
      />

      {workoutData.length > 0 &&
        (<ScrollView style={{ width: "90%", flex: 1, marginBottom: 20 }}>
          <View style={{ alignItems: "center" }}>
            <View style={{
              flexDirection: 'row',
              width: '100%',
              borderBottomWidth: 1,
              borderBottomColor: darkMode ? 'white' : 'black',
              marginTop: 10,
              justifyContent: 'space-between'
            }}>
              <RegularText textStyles={{ width: '50%', color: darkMode ? 'white' : 'black', textAlign: 'center' }}>Exercise</RegularText>
              <RegularText textStyles={{ width: '18%', color: darkMode ? 'white' : 'black', textAlign: 'center' }}>Sets</RegularText>
              <RegularText textStyles={{ width: '18%', color: darkMode ? 'white' : 'black', textAlign: 'center' }}>Reps</RegularText>
              <RegularText textStyles={{ width: '10%', color: darkMode ? 'white' : 'black', textAlign: 'center' }}>-</RegularText>
            </View>
            {workoutDataRow}
          </View>

          <TouchableOpacity
            onPress={handleAddRow}
            style={{ marginVertical: 20, width: 'fit-content', borderRadius: 999, marginHorizontal: 'auto' }}
          >
            <Ionicons name="add-circle-outline" size={50} color={darkMode ? 'white' : colors.black} />
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