import { useFonts } from "expo-font";
import React, { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import RootStack from './navigators/RootStack';
import SplashScreenAnimation from "./screens/SplashScreenAnimation";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  let fontsLoaded: boolean;

  [fontsLoaded] = useFonts({
    'Inter-Black': require("./assets/fonts/Inter-Black.otf"),
    'Inter-Bold': require("./assets/fonts/Inter-Bold.otf"),
    'Inter-Regular': require("./assets/fonts/Inter-Regular.otf"),
    'Inter-Light': require("./assets/fonts/Inter-Light.otf"),
  })

  useEffect(() => {
    async function prepare() {
      try {
        await new Promise(resolve => setTimeout(resolve, 2500));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
        SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  if (!appIsReady || !fontsLoaded) {
    return <SplashScreenAnimation/>;
  };

  return (
    <RootStack />
  );
}