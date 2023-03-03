import { FunctionComponent, useState } from "react";
import { TextInput, View } from "react-native";
import styled from "styled-components";

// custom components
import { Container } from "../components/shared";
import { colors } from "../components/colors";
import HeaderText from "../components/texts/HeaderText";
import RegularButton from "../components/buttons/RegularButton";

const LoginContainer = styled(Container)`
`;

const Login: FunctionComponent = () => {
  const [isCreateMode, setIsCreateMode] = useState(false);

  return (
    <LoginContainer>
      <HeaderText textStyles={{ textAlign: 'center' }}>Workout Tracker</HeaderText>

      <View style={{ alignItems: 'center', flex: 1 }}>
        <TextInput></TextInput>
        {/* password */}
        {/* password reentry */}
        {/* login toggle */}
        <RegularButton
          onPress={() => { }}
          btnStyles={{ width: '80%', backgroundColor: colors.orange }}
          textStyles={{ fontSize: 22 }}
        >
          {isCreateMode ? 'Create Account' : 'Login'}
        </RegularButton>
      </View>
    </LoginContainer>
  );
};

export default Login;