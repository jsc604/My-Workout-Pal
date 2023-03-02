import { FunctionComponent } from "react";
import { StatusBar } from "expo-status-bar";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, View, Text, ScrollView } from "react-native";

// custom components
import { Container } from "../components/shared";
import RegularButton from "../components/buttons/RegularButton";
import RegularText from "../components/texts/RegularText";
import { colors } from "../components/colors";

// navigation
import { RootStackParamList } from "../navigators/RootStack"
import { NativeStackScreenProps } from "@react-navigation/native-stack";
type Props = NativeStackScreenProps<RootStackParamList, "SelectWorkout">;

// workout data
import { workouts } from "../assets/workouts/workouts";

const SelectWorkoutContainer = styled(Container)`
`;

const SelectWorkout: FunctionComponent<Props> = ({ navigation }) => {

  const workoutListItems = workouts.map((workout, i) => {
    return (
      <TouchableOpacity
        key={i}
        onPress={() => { navigation.navigate("StartWorkout", { name: workout.name }) }}
        style={{ marginTop: 20, backgroundColor: colors.blue, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderRadius: 20, padding: 15 }}
      >
        <Text style={{ fontSize: 20 }}>{workout.name}</Text>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            onPress={() => { navigation.navigate("EditWorkout", { name: workout.name }) }}
            style={{ width: 40, height: 40, justifyContent: 'center', alignItems: 'center', margin: 'auto' }}
          >
            <Ionicons name="options-outline" size={30} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => { }}
            style={{ width: 40, height: 40, justifyContent: 'center', alignItems: 'center', marginLeft: 5 }}
          >
            <Ionicons name="trash-outline" size={30} color="black" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    )
  });

  return (
    <SelectWorkoutContainer>
      <StatusBar style="light" />
      <RegularButton
        onPress={() => { navigation.navigate("CreateWorkout") }}
        btnStyles={{ width: '80%', margin: 20, backgroundColor: colors.green }}
      >
        <strong>Create A New Workout</strong>
      </RegularButton>

      {workouts.length < 0 ?
        <>
          <RegularText textStyles={{ marginTop: 'auto', color: colors.black }}>You have no workouts</RegularText>
          <RegularText textStyles={{ marginBottom: 'auto', color: colors.black }}>Create one to get started</RegularText>
        </>
        :
        <ScrollView style={{ width: '80%' }}>
          {workoutListItems}
        </ScrollView>
      }

    </SelectWorkoutContainer>
  )
};

export default SelectWorkout;