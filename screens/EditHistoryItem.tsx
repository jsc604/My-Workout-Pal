import React, { FunctionComponent, useContext, useState } from "react";
import styled from "styled-components";
import { StatusBar } from "expo-status-bar";
import { ScrollView, View, StyleSheet, TextInput } from "react-native";
import { alertUpdate } from "../helpers/confirmationAlert";

// firebase
import firebase from '../node_modules/firebase/compat/';
const { firestore, auth } = firebase;

// custom components
import { Container } from "../components/shared";
import { colors } from "../components/colors";
import RegularText from "../components/texts/RegularText";
import RegularButton from "../components/buttons/RegularButton";
import { DarkModeContext } from "../providers/DarkModeProvider";

// navigation
import { RootStackParamList } from "../navigators/RootStack"
import { NativeStackScreenProps } from "@react-navigation/native-stack";
type Props = NativeStackScreenProps<RootStackParamList, "EditHistoryItem">;

const WorkoutHistoryItemContainer = styled(Container)``;

const EditHistoryItem: FunctionComponent<Props> = ({ route, navigation }) => {
  const { workoutName, completedSets, oldDoc, date } = route.params;
  const { darkMode } = useContext(DarkModeContext);

  const [updatedSets, setUpdatedSets] = useState(completedSets);
  const [dateString, setDateString] = useState(date);
  const [errorMessage, setErrorMessage] = useState('');

  const styles = StyleSheet.create({
    workoutHeader: {
      width: '20%',
      textAlign: 'center',
      fontSize: 20,
      fontWeight: 'bold',
      color: darkMode ? 'white' : 'black'
    },
    dateInput: {
      color: darkMode ? 'white' : 'black',
      borderColor: darkMode ? 'white' : 'black',
      fontSize: 20,
      textAlign: 'center',
      width: 50,
      borderRadius: 5,
      borderWidth: 1,
      marginLeft: 7
    },
    exerciseInputs: {
      margin: 'auto',
      textAlign: 'center',
      width: '30%',
      color: darkMode ? 'white' : 'black',
      borderColor: darkMode ? 'white' : 'black',
      borderRadius: 5,
      borderWidth: 1,
      marginLeft: 7,
      fontSize: 20
    }
  });

  const listsRef = firestore()
    .collection('users')
    .doc(auth()
      .currentUser?.uid)
    .collection('workoutHistory');

  let workoutData = [];
  for (let item in completedSets) {
    workoutData.push(completedSets[item]);
  };

  const handleDateChange = (field: 'month' | 'day' | 'year', value: string) => {
    const dateParts = dateString.split('/');
    const newValue = parseInt(value);

    if (isNaN(newValue)) {
      return;
    }

    switch (field) {
      case 'month':
        if (newValue < 1 || newValue > 12) {
          return;
        }
        dateParts[0] = value.padStart(2, '0');
        break;
      case 'day':
        if (newValue < 1 || newValue > 31) {
          return;
        }
        dateParts[1] = value.padStart(2, '0');
        break;
      case 'year':
        if (value.length !== 4) {
          return;
        }
        dateParts[2] = value;
        break;
    }

    const newDateString = dateParts.join('/');
    const newDate = new Date(newDateString);

    if (isNaN(newDate.getTime())) {
      return;
    }

    setDateString(newDateString);
  };

  const handleRepChange = (index: number, set: number, value: string) => {
    if (value === '' || isNaN(parseInt(value))) {
      return;
    }
    const newWorkoutData = JSON.parse(JSON.stringify(updatedSets));
    newWorkoutData[index].sets[set].reps = parseInt(value);
    setUpdatedSets(newWorkoutData);
  };

  const handleWeightChange = (index: number, set: number, value: string) => {
    if (value === '' || isNaN(parseInt(value))) {
      return;
    }
    const newWorkoutData = JSON.parse(JSON.stringify(updatedSets));
    newWorkoutData[index].sets[set].weight = parseInt(value);
    setUpdatedSets(newWorkoutData);
  };

  const validateDateInput = (): boolean => {
    if (!dateString) {
      setErrorMessage('Please enter a valid date');
      return false;
    }

    const dateParts = dateString.split('/');

    if (
      dateParts.length !== 3 ||
      !dateParts[0] ||
      !dateParts[1] ||
      !dateParts[2]
    ) {
      setErrorMessage('Please fill in all date fields');
      return false;
    }

    setErrorMessage('');
    return true;
  };

  const newDate = new Date(dateString);
  const localDateString = newDate.toLocaleDateString('en-US',
    { year: 'numeric', month: 'short', day: 'numeric' });

  const workoutDataRow = workoutData.map((item, i) => {

    const sets = [];
    for (let j = 1; j <= item.sets.length; j++) {
      sets.push(
        <View key={i + j} style={{ flexDirection: 'row', width: '100%', marginTop: 10, alignItems: 'center', justifyContent: 'center' }}>
          <RegularText textStyles={{ width: '40%', textAlign: 'left', color: darkMode ? 'white' : 'black' }}>{j === 1 ? item.exercise : null}</RegularText>
          <View style={{ flexDirection: 'row', width: '60%' }}>
            <RegularText textStyles={{ ...styles.exerciseInputs, color: 'black', backgroundColor: colors.green, borderColor: 'green' }}>{j}</RegularText>
            <TextInput
              style={{ ...styles.exerciseInputs }}
              placeholder={item.sets[j - 1].reps.toLocaleString()}
              onChangeText={(value) => { handleRepChange(i, j - 1, value) }}
            />
            <TextInput
              style={{ ...styles.exerciseInputs }}
              placeholder={item.sets[j - 1].weight.toLocaleString()}
              onChangeText={(value) => { handleWeightChange(i, j - 1, value) }}
            />
          </View>
        </View>
      );
    }

    return (
      <View key={i + 2000} style={{ borderBottomWidth: 1, paddingBottom: 10, borderBottomColor: darkMode ? colors.white :colors.black }}>
        {sets}
      </View>
    );
  });

  return (
    <WorkoutHistoryItemContainer style={{ flex: 1, alignItems: 'center', backgroundColor: darkMode ? colors.black : 'white' }}>

      <StatusBar style={darkMode ? 'dark' : 'light'} />
      <View style={{ flexDirection: 'row', marginVertical: 20 }}>
        <TextInput
          style={styles.dateInput}
          placeholder={'MM'}
          onChangeText={(text) => handleDateChange('month', text)}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.dateInput}
          placeholder={'DD'}
          onChangeText={(text) => handleDateChange('day', text)}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.dateInput}
          placeholder={'YYYY'}
          onChangeText={(text) => handleDateChange('year', text)}
          keyboardType="numeric"
        />
      </View>

      {errorMessage ? (
        <RegularText
          textStyles={{
            color: 'red',
            marginBottom: 10,
            fontWeight: 'bold',
          }}
        >
          {errorMessage}
        </RegularText>
      ) : null}

      <View style={{ flexDirection: 'row', width: '90%', borderBottomWidth: 1, borderBottomColor: darkMode ? 'white' : 'black' }}>
        <RegularText textStyles={{ width: '40%', fontSize: 20, fontWeight: 'bold', color: darkMode ? 'white' : 'black', textAlign: 'center' }}>Exercise</RegularText>
        <RegularText textStyles={styles.workoutHeader}>Set</RegularText>
        <RegularText textStyles={styles.workoutHeader}>Reps</RegularText>
        <RegularText textStyles={styles.workoutHeader}>Weight</RegularText>
      </View>

      <ScrollView style={{ width: "90%", flex: 1 }}>
        {workoutDataRow}
      </ScrollView>

      <RegularButton
        onPress={() => {
          if (validateDateInput()) {
            alertUpdate(
              darkMode,
              listsRef,
              oldDoc,
              localDateString,
              workoutName,
              updatedSets,
              () => navigation.goBack()
            );
          }
        }}
        btnStyles={{ marginVertical: 15, width: '90%' }}
        textStyles={{ fontWeight: 'bold' }}
      >
        Update Workout History
      </RegularButton>
    </WorkoutHistoryItemContainer>
  )
};

export default EditHistoryItem;