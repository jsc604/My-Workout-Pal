import { FunctionComponent } from "react";
import { StatusBar } from "expo-status-bar";
import styled from "styled-components/native";

//custom components
import { Container } from "../components/shared";
import { colors } from "../components/colors";
import HeaderText from "../components/texts/HeaderText";
import RegularText from "../components/texts/RegularText";
import BigText from "../components/texts/BIgText";

//image
import background from "../assets/background_1.png";

const WelcomeContainer = styled(Container)`
background-color: ${colors.green};
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
  resize-mode: fit;
`;

const BottomSection = styled.View`
  width: 100%;
  padding: 25px;
  flex: 1;
`;

const Welcome: FunctionComponent = () => {
  return (
    <>
      <StatusBar style="light"/>
      <WelcomeContainer>
        <TopSection>
          <TopImage source={background} />
        </TopSection>
        <BottomSection>
          <HeaderText textStyles={{width: '70%', marginBottom: 25}}>
            Track Your Fitness Progress
          </HeaderText>
          <RegularText textStyles={{width: '70%', marginBottom: 25}}>
            {'Connect with your friends\nSee how they are doing'}
          </RegularText>
          <BigText>
            Keep each other motivated
          </BigText>
        </BottomSection>
      </WelcomeContainer>
    </>
  )
};

export default Welcome;