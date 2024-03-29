import React, { FunctionComponent, useContext } from "react";
import { StyleProp, TextStyle } from "react-native";
import styled from "styled-components/native";

// custom components
import BigText from "../texts/BIgText";
import RegularText from "../texts/RegularText";
import { DarkModeContext } from "../../providers/DarkModeProvider";

const StyledView = styled.View`
  flex-direction: column;
  flex: 1;
  justify-content: center;
  margin-left: 5px;
`;

interface GreetingProps {
  mainText: string;
  subText?: string;
  mainTextStyles?: StyleProp<TextStyle>;
  subTextStyles?: StyleProp<TextStyle>;
};

const Greeting: FunctionComponent<GreetingProps> = (props) => {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <StyledView>
      <BigText
        textStyles={[
          {
            color: darkMode ? 'white' : 'black',
            fontSize: 22,
          },
          props.mainTextStyles
        ]}
      >
        {props.mainText}
      </BigText>
      <RegularText
        textStyles={[
          {
            color: darkMode ? 'white' : 'black',
            fontSize: 15,
          },
          props.subTextStyles
        ]}>
        {props.subText}
      </RegularText>
    </StyledView>
  )
};

export default Greeting;