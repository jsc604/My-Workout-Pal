import { FunctionComponent, useContext, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components";
import { StatusBar } from "expo-status-bar";
import { DarkModeContext } from "../providers/DarkModeProvider";
import validator from 'validator';

// firebase
import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import "firebase/compat/firestore";
const { auth, firestore } = firebase;

// custom components
import { Container } from "../components/shared";
import { colors } from "../components/colors";
import HeaderText from "../components/texts/HeaderText";
import RegularButton from "../components/buttons/RegularButton";
import LabelledInput from "../components/LabelledInput";

// logo
import dumbbell from "../assets/heavy-dumbbell-in-hand-cartoon-gym-bodybuilding-vector-13671760-removebg-preview.png";

const LoginContainer = styled(Container)``;

type inputType = {
  text?: string;
  errorMessage?: string;
};

const validateEmail = (email: string): boolean => {
  return validator.isEmail(email);
};

const validatePassword = (password: string): boolean => {
  return validator.isStrongPassword(password, {
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1
  })
};

const Login: FunctionComponent = () => {
  const [isCreateMode, setIsCreateMode] = useState(false);
  const [emailField, setEmailField] = useState<inputType>({ text: '', errorMessage: '' });
  const [passwordField, setPasswordField] = useState<inputType>({ text: '', errorMessage: '' });
  const [passwordConfirmationField, setPasswordConfirmationField] = useState<inputType>({ text: '', errorMessage: '' });
  const [nameField, setNameField] = useState<inputType>({ text: '', errorMessage: '' });
  const [loginError, setLoginError] = useState(false);
  const { darkMode } = useContext(DarkModeContext);

  const createAccount = (email: string, password: string) => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        if (user !== null) {
          console.log('creating user...');
          firestore().collection("users").doc(user.uid)
            .set({ name: nameField.text, email: emailField.text })
        }
      });
  };

  const login = (email: string, password: string) => {
    auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('logged in!');
      })
      .catch(() => {
        setLoginError(true);
      })
  };

  return (
    <LoginContainer>
      <StatusBar style={darkMode ? 'dark' : 'light'} />
      <ScrollView>
        <HeaderText textStyles={{ textAlign: 'center', marginVertical: 10 }}>Workout Tracker</HeaderText>

        <Image source={dumbbell} style={{ width: 300, height: 200, alignSelf: 'center', marginVertical: 50 }} />

        <View style={{ alignItems: 'center', flex: 1 }}>

          {isCreateMode &&
            <LabelledInput
              label="Name"
              text={nameField.text}
              errorMessage={nameField.errorMessage}
              onChangeText={(text) => { setNameField({ text }) }}
            />
          }
          {loginError &&
            <Text style={{ color: 'red', fontSize: 15, marginLeft: 4, textAlign: 'center', width: '80%' }}>
              {'We could not find your email or password\nPlease enter valid credentials'}
            </Text>}
          <LabelledInput
            label="Email"
            text={emailField.text}
            errorMessage={emailField.errorMessage}
            onChangeText={(text) => { setEmailField({ text }) }}
            autoComplete='email'
          />
          <LabelledInput
            label="Password"
            text={passwordField.text}
            errorMessage={passwordField.errorMessage}
            onChangeText={(text) => { setPasswordField({ text }) }}
            autoComplete='password'
            secureTextEntry={true}
          />

          {isCreateMode &&
            <LabelledInput
              label="Confirm password"
              text={passwordConfirmationField.text}
              errorMessage={passwordConfirmationField.errorMessage}
              onChangeText={(text) => { setPasswordConfirmationField({ text }) }}
              secureTextEntry={true}
            />
          }

          <TouchableOpacity onPress={() => {
            setLoginError(false);
            setIsCreateMode(!isCreateMode);
          }}>
            <Text style={{ fontSize: 15, color: 'blue', marginVertical: 10 }}>
              {isCreateMode ? 'Already have an account?' : 'Create a new account'}
            </Text>
          </TouchableOpacity>

          <RegularButton
            btnStyles={{ width: '90%', backgroundColor: colors.orange, marginBottom: 20 }}
            textStyles={{ fontSize: 22 }}
            onPress={() => {

              if (!isCreateMode) {
                let isLoginValid = true;
                if (!emailField.text) {
                  emailField.errorMessage = "Please enter a valid email";
                  setEmailField({ ...emailField });
                  isLoginValid = false;
                }
                if (!passwordField.text) {
                  passwordField.errorMessage = "Please enter your password";
                  setPasswordField({ ...passwordField });
                  isLoginValid = false;
                }
                if (emailField.text && passwordField.text) {
                  isLoginValid && login(emailField.text, passwordField.text);
                }
              }

              if (isCreateMode) {
                let isCreateValid = true;
                if (!nameField.text) {
                  nameField.errorMessage = 'Please enter your name';
                  setNameField({ ...nameField });
                  isCreateValid = false;
                }
                if (emailField.text) {
                  const validEmail = validateEmail(emailField.text);
                  if (!validEmail) {
                    emailField.errorMessage = "Please enter a valid email";
                    setEmailField({ ...emailField });
                    isCreateValid = false;
                  }
                }
                if (passwordField.text) {
                  const validPassword = validatePassword(passwordField.text);
                  if (!validPassword) {
                    passwordField.errorMessage = "Password must be:\n8 characters long\nat least 1 uppercase\nat least 1 lowercase\nat least 1 number\nat least 1 symbol";
                    setPasswordField({ ...passwordField });
                    isCreateValid = false;
                  }
                }
                if (!emailField.text) {
                  emailField.errorMessage = 'Please enter an email';
                  setEmailField({ ...emailField });
                  isCreateValid = false;
                }
                if (!passwordField.text) {
                  passwordField.errorMessage = 'Please enter a password';
                  setPasswordField({ ...passwordField });
                  isCreateValid = false;
                }
                if (!passwordConfirmationField.text || passwordConfirmationField.text !== passwordField.text) {
                  passwordConfirmationField.errorMessage = 'Passwords do not match';
                  setPasswordConfirmationField({ ...passwordConfirmationField });
                  isCreateValid = false;
                }
                if (nameField.text && emailField.text && passwordField.text && passwordConfirmationField.text) {
                  isCreateValid && createAccount(emailField.text, passwordField.text);
                }
              }
            }}
          >
            {isCreateMode ? 'Create Account' : 'Login'}
          </RegularButton>

        </View>
      </ScrollView>
    </LoginContainer>
  );
};

export default Login;