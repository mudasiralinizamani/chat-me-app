import { View, Text } from "react-native";
import React from "react";
import AppStackParams from "./AppStackParams";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Signin from "../../features/auth/screens/Signin";
import Signup from "../../features/auth/screens/Signup";

const Stack = createNativeStackNavigator<AppStackParams>();

const AppStack = () => {
  return (
    <View>
      <Stack.Navigator
        initialRouteName="Signin"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Signin" component={Signin} />
        <Stack.Screen name="Signup" component={Signup} />
      </Stack.Navigator>
    </View>
  );
};

export default AppStack;
