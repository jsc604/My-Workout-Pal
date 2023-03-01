import { FunctionComponent, useState } from "react";
import styled from "styled-components";
import { StatusBar } from "expo-status-bar";
import { ScrollView, View } from "react-native";

// custom components
import { Container } from "../components/shared";
import { colors } from "../components/colors";
import RegularButton from "../components/buttons/RegularButton";
import RegularText from "../components/texts/RegularText";
import Stopwatch from "../components/Stopwatch";

// navigation
import { RootStackParamList } from "../navigators/RootStack"
import { NativeStackScreenProps } from "@react-navigation/native-stack";
type Props = NativeStackScreenProps<RootStackParamList, "StartWorkout">;

const StartWorkoutContainer = styled(Container)``;

const StartWorkout: FunctionComponent<Props> = ({ navigation }) => {
  const [started, setStarted] = useState(false);

  return (
    <StartWorkoutContainer style={{ flex: 1, alignItems: 'center' }}>

      <StatusBar style="light" />

      {!started ?
        <RegularButton
          onPress={() => { setStarted(true)}}
          btnStyles={{ width: '80%', marginTop: 20, marginBottom: 20, backgroundColor: colors.orange }}
        >
          <strong>Start Workout</strong>
        </RegularButton>
        :
        <Stopwatch/>
      }
      <ScrollView style={{ width: "80%", flex: 1}}>
        <View style={{ alignItems: "center" }}>
          <View style={{ flexDirection: 'row', width: '100%', borderBottomWidth: 1, marginTop: 10 }}>
            <RegularText textStyles={{ width: '50%' }}>Exercise</RegularText>
            <RegularText textStyles={{ width: '25%', textAlign: 'center' }}>Sets</RegularText>
            <RegularText textStyles={{ width: '25%', textAlign: 'center' }}>Reps</RegularText>
          </View>
        </View>
      </ScrollView>

      <RegularButton
        onPress={() => {}}
        btnStyles={{ width: '80%', marginTop: 20, marginBottom: 20, backgroundColor: colors.green }}
      >
        <strong>Complete workout</strong>
      </RegularButton>
    </StartWorkoutContainer>
  )
};

export default StartWorkout;