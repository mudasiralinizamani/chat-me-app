import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthStackParams from "./AuthStackParams";

// Screens
import Signin from "../../features/auth/screens/Signin";
import Signup from "../../features/auth/screens/Signup";

const Stack = createNativeStackNavigator<AuthStackParams>();

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Signin"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Signin" component={Signin} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
};

export default AuthStack;
