import { FunctionComponent } from "react";
import styled from "styled-components";
import { StatusBar } from "expo-status-bar";

// custom components
import { Container } from "../components/shared";
import { colors } from "../components/colors";
import RegularButton from "../components/buttons/RegularButton";

// navigation
import { RootStackParamList } from "../navigators/RootStack"
import { NativeStackScreenProps } from "@react-navigation/native-stack";
type Props = NativeStackScreenProps<RootStackParamList, "StartWorkout">;

const StartWorkoutContainer = styled(Container)``;

const StartWorkout: FunctionComponent<Props> = ({ navigation }) => {
  return (
    <StartWorkoutContainer>
      
      <StatusBar style="light" />
      <RegularButton
        onPress={() => {  }}
        textStyles={{ fontSize: 20 }}
        btnStyles={{ width: '80%', margin: 'auto', marginTop: 20, marginBottom: 20, backgroundColor: colors.orange }}
      >
        <strong>Start Workout</strong>
      </RegularButton>

      
    </StartWorkoutContainer>
  )
};



export default StartWorkout;