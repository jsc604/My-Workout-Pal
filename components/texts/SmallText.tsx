import { FunctionComponent } from "react";
import styled from "styled-components/native";

//custom components
import { TextProps } from "./types";

const StyledText = styled.Text`
  font-size: 15px;
  color: black;
  text-align: left;
  font-family: Inter-Light;
`;

const SmallText: FunctionComponent<TextProps> = (props) => {
  return (
    <StyledText style={props.textStyles}>{props.children}</StyledText>
  )
};

export default SmallText;