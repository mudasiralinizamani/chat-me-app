import { ScrollView, Image, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../../../../assets/styles/features/auth/screens/SigninStyles";
import { Button, Colors, Paragraph, TextInput } from "react-native-paper";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import AuthStackParams from "../../../core/routes/AuthStackParams";

type Props = NativeStackScreenProps<AuthStackParams, "Signup">;

function Signup({ navigation }: Props) {
  const [hidePassword, setHidePassword] = useState<boolean>(true);

  // Model data
  const [email, setEmail] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.container}>
        <Image
          source={require("../../../../assets/images/rn-social-logo.png")}
          style={styles.logo}
        />
        <Text style={styles.header}>Chat Me</Text>

        <TextInput
          label="FullName"
          mode="outlined"
          left={<TextInput.Icon name="account" />}
          style={styles.textInput}
          onChangeText={(value) => setFullName(value)}
        />

        <TextInput
          label="Email"
          mode="outlined"
          left={<TextInput.Icon name="email" />}
          style={styles.textInput}
          onChangeText={(value) => setEmail(value)}
        />

        <TextInput
          label="Password"
          mode="outlined"
          left={<TextInput.Icon name="lock" />}
          secureTextEntry={hidePassword}
          right={
            <TextInput.Icon
              name={hidePassword ? "eye" : "eye-off"}
              onPress={() => setHidePassword(!hidePassword)}
            />
          }
          style={styles.textInput}
          onChangeText={(value) => setPassword(value)}
        />

        <Button
          icon="send"
          mode="contained"
          onPress={() => console.log("Pressed")}
          style={styles.button}
        >
          Sign Up
        </Button>

        <TouchableOpacity
          style={{ marginVertical: 35 }}
          onPress={() => navigation.navigate("Signin")}
        >
          <Paragraph style={{ color: Colors.blue400 }}>
            Already have an account? Sign In
          </Paragraph>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Signup;
