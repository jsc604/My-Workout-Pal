import React, { FunctionComponent } from "react";
import styled from "styled-components/native";

//custom components
import { TextProps } from "./types";

const StyledText = styled.Text`
  font-size: 20px;
  color: black;
  text-align: left;
  font-family: Inter-Regular;
`;

const RegularText: FunctionComponent<TextProps> = (props) => {
  return (
    <StyledText style={props.textStyles}>{props.children?.toString()}</StyledText>
  )
};

export default RegularText;