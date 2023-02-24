import Welcome from "./screens/Welcome";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";

export default function App() {
  let [fontsLoaded] = useFonts({
    'Inter-Black': require("./assets/fonts/Inter-Black.otf"),
    'Inter-Bold': require("./assets/fonts/Inter-Bold.otf"),
    'Inter-Regular': require("./assets/fonts/Inter-Regular.otf"),
    'Inter-Light': require("./assets/fonts/Inter-Light.otf"),
  })

  if (!fontsLoaded) {
    return <AppLoading />;
  };

  return (
    <Welcome />
    
  );
}