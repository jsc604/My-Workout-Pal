import { useFonts } from "expo-font";
import React, { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import SplashScreenAnimation from "./screens/SplashScreenAnimation";
import { NavigationContainer } from "@react-navigation/native";
import { initializeApp } from "firebase/app";
import * as firebase from "firebase/app";

// naviagtion
import RootStack from './navigators/RootStack';
import AuthStack  from "./navigators/AuthStack";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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

  // if (!appIsReady || !fontsLoaded) {
  //   return <SplashScreenAnimation/>;
  // };

  return (
    <NavigationContainer>
     { isAuthenticated ? <RootStack /> : <AuthStack /> }
    </NavigationContainer>
  );
};

const firebaseConfig = {
  apiKey: "AIzaSyCpXclsbtv3q-E2Dd4tHjAE9pFbRKi6FeY",
  authDomain: "workout-tracker-c87d2.firebaseapp.com",
  projectId: "workout-tracker-c87d2",
  storageBucket: "workout-tracker-c87d2.appspot.com",
  messagingSenderId: "906094849199",
  appId: "1:906094849199:web:dc282640bdcf515b24385a",
  measurementId: "G-9Q99QMXLWX"
};

firebase.initializeApp(firebaseConfig);