// import { FunctionComponent, useEffect, useRef } from "react";
// import styled from "styled-components/native";
// import { Container } from "../components/shared";
// import { Animated } from "react-native";

// // custom component
// import { colors } from "../components/colors";

// import dumbbell from "../assets/heavy-dumbbell-in-hand-cartoon-gym-bodybuilding-vector-13671760-removebg-preview.jpg";

// const SplashScreenContainer = styled(Container)`
//   background-color: ${colors.black};
//   width: 100%;
//   height: 100%;
//   justify-content: center;
//   align-items: center;
// `;

// const SplashScreenImage = styled(Animated.Image)`
//   width: 80%;
//   height: 80%;
//   resize-mode: contain;
// `;

// const SplashScreenAnimation: FunctionComponent = () => {
//   const rotation = useRef(new Animated.Value(0)).current;

//   useEffect(() => {
//     Animated.timing(rotation, {
//       toValue: 90,
//       duration: 1500,
//       useNativeDriver: true,
//     }).start();
//   }, []);

//   return (
//     <SplashScreenContainer>
//       <SplashScreenImage
//         source={dumbbell}
//         style={{
//           transform: [{ rotate: rotation.interpolate({
//               inputRange: [0, 90],
//               outputRange: ["0deg", "90deg"]
//             })
//           }]
//         }}
//       />
//     </SplashScreenContainer>
//   );
// };

// export default SplashScreenAnimation;

import { FunctionComponent, useEffect, useState } from "react";
import styled from "styled-components/native";
import { Container } from "../components/shared";

// custom component
import { colors } from "../components/colors";

import dumbbell from "../assets/dumbbell black.jpg";

const SplashScreenContainer = styled(Container)`
  background-color: black;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const SplashScreenImage = styled.Image<{ rotate: string }>`
  width: 80%;
  height: 80%;
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
