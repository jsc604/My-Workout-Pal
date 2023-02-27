import { StatusBar } from "expo-status-bar";
import { FunctionComponent } from "react";
import styled from "styled-components";
import RegularButton from "../components/buttons/RegularButton";
import { colors } from "../components/colors";
import { Container } from "../components/shared";

const SelectWorkoutContainer = styled(Container)`
`;

const SelectWorkout: FunctionComponent = () => {
  return (
    <SelectWorkoutContainer>
      <StatusBar style="light"/>
      <RegularButton 
        onPress={() => {}}
        btnStyles={{
          width: '70%', 
          marginTop: 20, 
          marginLeft: 'auto', 
          marginRight: 'auto', 
          backgroundColor: colors.blue
        }}
        textStyles={{fontSize: 20}}
        >
        <strong>Create New Workout</strong>
      </RegularButton>

    </SelectWorkoutContainer>
  )
};

export default SelectWorkout;