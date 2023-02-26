import { FunctionComponent } from "react";
import { StatusBar } from "expo-status-bar";
import styled from "styled-components/native";

// custom components
import { Container } from "../components/shared";
import RegularButton from "../components/buttons/RegularButton";
import { colors } from "../components/colors";

const HomeContainer = styled(Container)`
  background-color: white;
  // justify-content: center;
  width: 100%;
  flex: 1;
`;

const Home: FunctionComponent = () => {
  return (
    <HomeContainer>
      <StatusBar style="dark" />
      <RegularButton 
        onPress={() => {}}
        textStyles={{fontSize: 20}}
        btnStyles={{width: '70%', marginTop: 20}}
        >
          <strong>Start A New Workout</strong>
      </RegularButton>
      <RegularButton 
        onPress={() => {}}
        textStyles={{fontSize: 20}}
        btnStyles={{width: '70%', marginTop: 20, backgroundColor: colors.orange}}
        >
          <strong>Your Progress</strong>
      </RegularButton>
    </HomeContainer>
  )
};

export default Home;