import React, { FunctionComponent, useContext } from "react";
import styled from "styled-components";
import { StatusBar } from "expo-status-bar";
import { ScrollView, View, StyleSheet } from "react-native";

// custom components
import { Container } from "../components/shared";
import { colors } from "../components/colors";
import RegularText from "../components/texts/RegularText";
import BigText from "../components/texts/BIgText";
import { DarkModeContext } from "../providers/DarkModeProvider";

// navigation
import { RootStackParamList } from "../navigators/RootStack"
import { NativeStackScreenProps } from "@react-navigation/native-stack";
type Props = NativeStackScreenProps<RootStackParamList, "EditHistoryItem">;

const WorkoutHistoryItemContainer = styled(Container)``;

const EditHistoryItem: FunctionComponent<Props> = ({ route }) => {
  const { workoutName, completedSets } = route.params;
  const { darkMode } = useContext(DarkModeContext);

  const styles = StyleSheet.create({
    workoutHeader: {
      width: '20%',
      textAlign: 'center',
      fontSize: 20,
      fontWeight: 'bold',
      color: darkMode ? 'white' : 'black'
    }
  });

  let workoutData = [];
  for (let item in completedSets) {
    workoutData.push(completedSets[item]);
  };

  const workoutDataRow = workoutData.map((item, i) => {

    const sets = [];
    for (let j = 1; j <= item.sets.length; j++) {
      sets.push(
        <View key={i + j} style={{ flexDirection: 'row', width: '100%', marginTop: 10, alignItems: 'center', justifyContent: 'center' }}>
          <RegularText textStyles={{ width: '40%', textAlign: 'left', color: darkMode ? 'white' : 'black' }}>{j === 1 ? item.exercise : null}</RegularText>
          <View style={{ flexDirection: 'row', width: '60%' }}>
            <RegularText textStyles={{ margin: 'auto', textAlign: 'center', width: '30%', backgroundColor: colors.green, borderRadius: 5, borderColor: 'green', borderWidth: 1, marginLeft: 7 }}>{j}</RegularText>
            <RegularText textStyles={{ margin: 'auto', textAlign: 'center', width: '30%', backgroundColor: colors.blue, borderRadius: 5, borderColor: 'blue', borderWidth: 1, marginLeft: 7 }}>{item.sets[j - 1].reps}</RegularText>
            <RegularText textStyles={{ margin: 'auto', textAlign: 'center', width: '30%', backgroundColor: colors.orange, borderRadius: 5, borderColor: 'orange', borderWidth: 1, marginLeft: 7 }}>{item.sets[j - 1].weight}</RegularText>
          </View>
        </View>
      );
    }

    return (
      <View key={i + 2000} style={{ borderBottomWidth: 1, paddingBottom: 10, borderBottomColor: colors.black }}>
        {sets}
      </View>
    );
  });

  return (
    <WorkoutHistoryItemContainer style={{ flex: 1, alignItems: 'center', backgroundColor: darkMode ? '#2d2d30' : 'white' }}>

      <StatusBar style={darkMode ? 'dark' : 'light'} />

      <BigText textStyles={{ marginVertical: 20, color: darkMode ? 'white' : 'black' }} >{workoutName}</BigText>

      <View style={{ flexDirection: 'row', width: '90%', borderBottomWidth: 1, borderBottomColor: darkMode ? 'white' : 'black' }}>
        <RegularText textStyles={{ width: '40%', fontSize: 20, fontWeight: 'bold', color: darkMode ? 'white' : 'black', textAlign: 'center' }}>Exercise</RegularText>
        <RegularText textStyles={styles.workoutHeader}>Set</RegularText>
        <RegularText textStyles={styles.workoutHeader}>Reps</RegularText>
        <RegularText textStyles={styles.workoutHeader}>Weight</RegularText>
      </View>

      <ScrollView style={{ width: "90%", flex: 1 }}>
        {workoutDataRow}
      </ScrollView>

    </WorkoutHistoryItemContainer>
  )
};

export default EditHistoryItem;