import React, { FunctionComponent, useContext } from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { DarkModeContext } from "../../providers/DarkModeProvider";
import { colors } from "../colors";

const DarkModeToggle: FunctionComponent = () => {
  const { darkMode, setDarkMode } = useContext(DarkModeContext);

  return (
    <TouchableOpacity
      style={{ marginRight: 20 }}
      onPress={() => { setDarkMode(!darkMode) }}
    >
      <Ionicons name={darkMode ? 'sunny-outline' : 'moon'} size={35} color={darkMode ? colors.orange : "#2d2d30"} />
    </TouchableOpacity>
  )
};

export default DarkModeToggle;
