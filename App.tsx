import { apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId, measurementId } from "@env"

import React, { useEffect, useState } from 'react';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import SplashScreenAnimation from "./screens/SplashScreenAnimation";
import { NavigationContainer } from "@react-navigation/native";
const { width } = Dimensions.get('window');
import DarkModeProvider from './providers/DarkModeProvider';

// firebase
import firebase from 'firebase/compat/app';
const { initializeApp, auth } = firebase;

// naviagtion
import RootStack from './navigators/RootStack';
import AuthStack from "./navigators/AuthStack";
import { StyleSheet, View, Dimensions } from "react-native";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [fontLoaded, setFontLoaded] = useState(false);

  const firebaseConfig = {
    apiKey: apiKey,
    authDomain: authDomain,
    projectId: projectId,
    storageBucket: storageBucket,
    messagingSenderId: messagingSenderId,
    appId: appId,
    measurementId: measurementId
  };

  initializeApp(firebaseConfig);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'Inter-Black': require('./assets/fonts/Inter-Black.otf'),
        'Inter-Bold': require('./assets/fonts/Inter-Bold.otf'),
        'Inter-Regular': require('./assets/fonts/Inter-Regular.otf'),
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
    if (auth().currentUser) {
      setIsAuthenticated(true);
    }
    firebase.auth().onAuthStateChanged(user => {
      console.log('checking auth state...');
      user ? setIsAuthenticated(true) : setIsAuthenticated(false);
    })
  })

  if (!appIsReady || !fontLoaded) {
    return <SplashScreenAnimation />;
  };

  return (
    <DarkModeProvider>
      <View style={{ backgroundColor: '#2d2d30', flex: 1 }}>
        <View style={styles.screen}>
          <NavigationContainer>
            {isAuthenticated ? <RootStack /> : <AuthStack />}
          </NavigationContainer>
        </View>
      </View>
    </DarkModeProvider>
  );
};

const styles = StyleSheet.create({
  screen: {
    margin: 'auto',
    width: width >= 820 ? 820 : '100%',
    height: '100%',
  },
});