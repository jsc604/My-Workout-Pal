import { FunctionComponent } from "react";
import { StatusBar } from "expo-status-bar";
import styled from "styled-components/native";

// custom components
import { Container } from "../components/shared";
import RegularButton from "../components/buttons/RegularButton";
import { colors } from "../components/colors";

// navigation
import { RootStackParamList } from "../navigators/RootStack"
import { NativeStackScreenProps } from "@react-navigation/native-stack";
type Props = NativeStackScreenProps<RootStackParamList, "Home">;

const HomeContainer = styled(Container)`
`;

const Home: FunctionComponent<Props> = ({ navigation }) => {
  return (
    <HomeContainer>
      <StatusBar style="light" />
      <RegularButton
        onPress={() => { navigation.navigate("SelectWorkout") }}
        btnStyles={{ width: '90%', marginTop: 20 }}
        textStyles={{ fontWeight: 'bold' }}
      >
        Start A New Workout
      </RegularButton>
      <RegularButton
        onPress={() => { navigation.navigate('WorkoutHistoryList') }}
        btnStyles={{ width: '90%', marginTop: 20, backgroundColor: colors.blue }}
        textStyles={{ fontWeight: 'bold' }}
      >
        Workout History
      </RegularButton>
      <RegularButton
        onPress={() => { }}
        btnStyles={{ width: '90%', marginTop: 20, backgroundColor: colors.orange }}
        textStyles={{ fontWeight: 'bold' }}
      >
        Your Progress
      </RegularButton>
    </HomeContainer>
  )
};

export default Home;