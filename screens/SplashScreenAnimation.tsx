import React, { FunctionComponent, useEffect, useState } from "react";
import styled from "styled-components/native";
import { Container } from "../components/shared";
import { colors } from "../components/colors";

// image
import dumbbell from "../assets/heavy-dumbbell-in-hand-cartoon-gym-bodybuilding-vector-13671760-removebg-preview.png";

const SplashScreenContainer = styled(Container)`
  background-color: ${colors.black};
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const SplashScreenImage = styled.Image<{ rotate: string }>`
  width: 50%;
  height: 50%;
  flex: 1;
  resize-mode: contain;
  transform: ${({ rotate }) => rotate};
  transition: transform 1.5s ease-in-out;
`;

const SplashScreen: FunctionComponent = () => {
  const [rotate, setRotate] = useState("rotate(0deg)");

  useEffect(() => {
    setTimeout(() => {
      setRotate("rotate(90deg)");
    }, 500);
  }, []);

  return (
    <SplashScreenContainer>
      <SplashScreenImage source={dumbbell} rotate={rotate} />
    </SplashScreenContainer>
  );
};

export default SplashScreen;
