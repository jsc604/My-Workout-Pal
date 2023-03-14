import { Alert } from "react-native";

export const alertPress = () =>
Alert.alert('confirm test', 'Are you sure you want to confirm?', [
  { text: 'Cancel', onPress: () => console.log('cancelled') },
  { text: 'confirm', onPress: () => console.log('confirmed') }
])