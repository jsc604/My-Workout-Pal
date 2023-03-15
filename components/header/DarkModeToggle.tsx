import { FunctionComponent, useContext } from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { DarkModeContext } from "../../providers/DarkModeProvider";

const DarkModeToggle: FunctionComponent = () => {
  const { darkMode, setDarkMode } = useContext(DarkModeContext);

  return (
    <TouchableOpacity
      style={{ marginRight: 20 }}
      onPress={() => { setDarkMode(!darkMode) }}
    >
      <Ionicons name={darkMode ? 'sunny-outline' : 'moon-outline'} size={35} color={darkMode ? '#fdfd96' : "#2d2d30"} />
    </TouchableOpacity>
  )
};

export default DarkModeToggle;
