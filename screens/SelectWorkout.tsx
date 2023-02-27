import { FunctionComponent } from "react";
import { StatusBar } from "expo-status-bar";
import styled from "styled-components/native";

// custom components
import { Container } from "../components/shared";
import RegularButton from "../components/buttons/RegularButton";
import RegularText from "../components/texts/RegularText";
import { colors } from "../components/colors";

// navigation
import { RootStackParamList } from "../navigators/RootStack"
import { NativeStackScreenProps } from "@react-navigation/native-stack";
type Props = NativeStackScreenProps<RootStackParamList, "SelectWorkout">;

const SelectWorkoutContainer = styled(Container)`
`;

const SelectWorkout: FunctionComponent<Props> = ({navigation}) => {
  return (
    <SelectWorkoutContainer>
      <StatusBar style="dark" />
        <RegularButton
          onPress={() => { navigation.navigate("CreateWorkout") }}
          textStyles={{ fontSize: 20 }}
          btnStyles={{ width: '70%', marginTop: 20 }}
        >
          <strong>Create A New Workout</strong>
        </RegularButton>
      
        <RegularText textStyles={{fontSize: 20, color: colors.black, marginTop: 'auto'}}>
          You have no workouts
        </RegularText>
        <RegularText textStyles={{fontSize: 20, color: colors.black, marginBottom: 'auto'}}>
          Create one to get started
        </RegularText>
      
    </SelectWorkoutContainer>
  )
};

export default SelectWorkout;