import { FunctionComponent } from "react";
import { StatusBar } from "expo-status-bar";
import styled from "styled-components/native";

//custom components
import { Container } from "../components/shared";
import { colors } from "../components/colors";
import HeaderText from "../components/texts/HeaderText";
import RegularText from "../components/texts/RegularText";
import BigText from "../components/texts/BIgText";
import RegularButton from "../components/buttons/RegularButton";

//image
import background from "../assets/evan-wise-wTcD3MwL_VY-unsplash.jpg";

const WelcomeContainer = styled(Container)`
background-color: black;
justify-content: space-between;
height: 100%;
width: 100%;
`;

const TopSection = styled.View`
  width: 100%;
  flex: 1;
  max-height: 55%;
`;

const TopImage = styled.Image`
  width: 100%;
  height: 100%;
  resize-mode: cover;
`;

const BottomSection = styled.View`
  width: 100%;
  padding: 25px;
  flex: 1;
  justify-content: flex-end;
`;

const Welcome: FunctionComponent = () => {
  return (
    <>
      <StatusBar style="light" />
      <WelcomeContainer>
        <TopSection>
          <TopImage source={background}/>
        </TopSection>
        <BottomSection>
          <HeaderText textStyles={{ width: '70%', marginBottom: 25, color: colors.green }}>
            Track Your Fitness Progress
          </HeaderText>
          <RegularText textStyles={{ width: '70%', marginBottom: 25, color: colors.green }}>
            {'Connect with your friends\nSee how they are doing'}
          </RegularText>
          <BigText textStyles={{ width: '70%', marginBottom: 25, color: colors.green }}>
            Keep each other motivated
          </BigText>
          <RegularButton
            textStyles={{ color: 'black', fontSize: 25 }}
            onPress={() => { }}
          >
            <strong>Get Started</strong>
          </RegularButton>
        </BottomSection>
      </WelcomeContainer>
    </>
  )
};

export default Welcome;