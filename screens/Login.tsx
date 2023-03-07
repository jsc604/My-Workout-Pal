import { FunctionComponent, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components";
import validator from 'validator';
import firebase from 'firebase/compat/app';
import "firebase/compat/auth";

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

const validateFields = (email: string, password: string) => {
  const isValid = {
    email: validator.isEmail(email),
    password: validator.isStrongPassword(password, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1
    })
  };

  return isValid;
};

const createAccount = (email: string, password: string) => {
  firebase.auth()
    .createUserWithEmailAndPassword(email, password)
    .then(({user}) => {
      console.log('creating user...');
    });
};

const login = (email: string, password: string) => { };

const Login: FunctionComponent = () => {
  const [isCreateMode, setIsCreateMode] = useState(false);
  const [emailField, setEmailField] = useState<inputType>({ text: '', errorMessage: '' })
  const [passwordField, setPasswordField] = useState<inputType>({ text: '', errorMessage: '' })
  const [passwordConfirmationField, setPasswordConfirmationField] = useState<inputType>({ text: '', errorMessage: '' })

  return (
    <LoginContainer>
      <HeaderText textStyles={{ textAlign: 'center', marginVertical: 10 }}>Workout Tracker</HeaderText>

      <Image source={dumbbell} style={{ width: 300, height: 200, alignSelf: 'center', marginVertical: 50 }} />

      <View style={{ alignItems: 'center', flex: 1 }}>

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

        <TouchableOpacity onPress={() => setIsCreateMode(!isCreateMode)}>
          <Text style={{ fontSize: 15, color: 'blue', marginVertical: 10 }}>
            {isCreateMode ? 'Already have an account?' : 'Create a new account'}
          </Text>
        </TouchableOpacity>

        <RegularButton
          onPress={() => {
            if (emailField.text && passwordField.text) {
              const isValid = validateFields(emailField.text, passwordField.text);
              let isAllValid = true;
              if (!isValid.email) {
                emailField.errorMessage = "Please enter a valid email";
                setEmailField({ ...emailField })
                isAllValid = false;
              }

              if (!isValid.password) {
                passwordField.errorMessage = "Password must be:\n8 characters long\nat least 1 uppercase\nat least 1 lowercase\nat least 1 number\nat least 1 symbol";
                setPasswordField({ ...passwordField });
                isAllValid = false;
              }

              if (isCreateMode && passwordConfirmationField.text !== passwordField.text) {
                passwordConfirmationField.errorMessage = 'Passwords do not match';
                setPasswordConfirmationField({ ...passwordConfirmationField });
                isAllValid = false;
              }

              if (isAllValid) {
                isCreateMode ? createAccount(emailField.text, passwordField.text) : login(emailField.text, passwordField.text);
              }
            }
          }}
          btnStyles={{ width: '90%', backgroundColor: colors.orange }}
          textStyles={{ fontSize: 22 }}
        >
          {isCreateMode ? 'Create Account' : 'Login'}
        </RegularButton>

      </View>
    </LoginContainer>
  );
};

export default Login;