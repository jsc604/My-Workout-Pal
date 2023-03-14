import { FunctionComponent, useContext } from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { DarkModeContext } from "../../providers/DarkModeProvider";

type Props = {
  navigation: any;
};

const SettingsButton: FunctionComponent<Props> = ({ navigation }) => {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <TouchableOpacity
      style={{ marginRight: 20 }}
      onPress={() => { navigation.navigate("Settings") }}
    >
      <Ionicons name="settings-outline" size={35} color={darkMode ? 'white' : "black"} />
    </TouchableOpacity>
  )
};

export default SettingsButton;
