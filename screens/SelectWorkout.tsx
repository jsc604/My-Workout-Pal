import { FunctionComponent } from "react";
import { StatusBar } from "expo-status-bar";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";

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
import { ScrollView } from "react-native-gesture-handler";
import { TouchableOpacity, View } from "react-native";

const SelectWorkoutContainer = styled(Container)`
`;

const SelectWorkout: FunctionComponent<Props> = ({ navigation }) => {

  const workoutListItems = workouts.map((workout) => {
    return (
      <TouchableOpacity
        onPress={() => { }}
        style={{ marginTop: 20, backgroundColor: colors.blue, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', fontSize: '20px', fontFamily: 'Inter-Regular', borderRadius: 20, padding: 15 }}
      >
        {workout.name}
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() => { }}
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
        textStyles={{ fontSize: 20 }}
        btnStyles={{ width: '80%', margin: 20, backgroundColor: colors.green }}
      >
        <strong>Create A New Workout</strong>
      </RegularButton>

      {workouts.length < 0 ?
        <>
          <RegularText textStyles={{ marginTop: 'auto', fontSize: 20, color: colors.black }}>You have no workouts</RegularText>
          <RegularText textStyles={{ marginBottom: 'auto', fontSize: 20, color: colors.black }}>Create one to get started</RegularText>
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