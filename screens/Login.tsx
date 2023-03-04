import { FunctionComponent, useState } from "react";
import { TextInput, View } from "react-native";
import styled from "styled-components";

// custom components
import { Container } from "../components/shared";
import { colors } from "../components/colors";
import HeaderText from "../components/texts/HeaderText";
import RegularButton from "../components/buttons/RegularButton";
import LabelledInput from "../components/LabelledInput";

const LoginContainer = styled(Container)`
`;

type inputType = {
  text?: string;
  errorMessage?: string;
};

interface LoginProps {}

const Login: FunctionComponent<LoginProps> = () => {
  const [isCreateMode, setIsCreateMode] = useState(false);
  const [emailField, setEmailField] = useState<inputType>({ text: '', errorMessage: '' })
  const [passwordField, setPasswordField] = useState<inputType>({ text: '', errorMessage: '' })
  const [passwordConfirmationField, setPasswordConfirmationField] = useState<inputType>({ text: '', errorMessage: '' })

  return (
    <LoginContainer>
      <HeaderText textStyles={{ textAlign: 'center' }}>Workout Tracker</HeaderText>

      <View style={{ alignItems: 'center', flex: 1 }}>

        <LabelledInput
          label="Email"
          text={emailField.text}
          errorMessage={emailField.errorMessage}
          onChangeText={(text) => { setEmailField({text}) }}
          autoComplete='email'
        />
        <LabelledInput
          label="Password"
          text={passwordField.text}
          errorMessage={passwordField.errorMessage}
          onChangeText={(text) => { setPasswordField({text}) }}
          autoComplete='password'
          secureTextEntry={true}
        />
        <LabelledInput
          label="Password Confirmation"
          text={passwordConfirmationField.text}
          errorMessage={passwordConfirmationField.errorMessage}
          onChangeText={(text) => { setPasswordConfirmationField({text}) }}
          secureTextEntry={true}
        />
        <RegularButton
          onPress={() => { }}
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