import { StyleProp, TextStyle } from "react-native";

export interface TextProps {
  textStyles?: StyleProp<TextStyle>;
  children: React.ReactNode;
}