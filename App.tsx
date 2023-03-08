import React, { useEffect, useState } from 'react';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import SplashScreenAnimation from "./screens/SplashScreenAnimation";
import { NavigationContainer } from "@react-navigation/native";

// firebase
import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
const { initializeApp } = firebase;

// naviagtion
import RootStack from './navigators/RootStack';
import AuthStack from "./navigators/AuthStack";
import DarkModeProvider from './providers/DarkModeProvider';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'Inter-Black': require('./assets/fonts/Inter-Black.otf'),
        'Inter-Bold': require('./assets/fonts/Inter-Bold.otf'),
        'Inter-Regular': require('./assets/fonts/Inter-Regular.otf'),
        'Inter-Light': require('./assets/fonts/Inter-Light.otf'),
      });
      setFontLoaded(true);
    }

    loadFonts();
  }, []);

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

  useEffect(() => {
    if (firebase.auth().currentUser) {
      setIsAuthenticated(true);
    }
    firebase.auth().onAuthStateChanged(user => {
      console.log('checking auth state...');
      user ? setIsAuthenticated(true) : setIsAuthenticated(false);
    })
  })

  // if (!appIsReady || !fontLoaded) {
  //   return <SplashScreenAnimation />;
  // };

  return (
    <DarkModeProvider>
      <NavigationContainer>
        {isAuthenticated ? <RootStack /> : <AuthStack />}
      </NavigationContainer>
    </DarkModeProvider>
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

initializeApp(firebaseConfig);