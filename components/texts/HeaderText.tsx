import { FunctionComponent } from "react";
import styled from "styled-components/native";

//custom components
import { TextProps } from "./types";

const StyledText = styled.Text`
  font-size: 40px;
  color: black;
  text-align: left;
  font-family: Inter-Black;
`;

const HeaderText: FunctionComponent<TextProps> = (props) => {
  return (
    <StyledText style={props.textStyles}>{props.children?.toString()}</StyledText>
  )
};

export default HeaderText;