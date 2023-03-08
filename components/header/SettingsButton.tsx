import { FunctionComponent } from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  navigation: any;
};

const SettingsButton: FunctionComponent<Props> = ({navigation}) => {

  return (
    <TouchableOpacity
      style={{ marginRight: 20 }}
      onPress={() => { navigation.navigate("Settings") }}
    >
      <Ionicons name="settings-outline" size={35} color="black" />
    </TouchableOpacity>
  )
};

export default SettingsButton;
