import { ScrollView, Image, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../../../../assets/styles/features/auth/screens/SigninStyles";
import {
  Button,
  Colors,
  Paragraph,
  TextInput,
} from "react-native-paper";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import AuthStackParams from "../../../core/routes/AuthStackParams";
import ISignup from "../../../core/Interfaces/ISignup";
import * as yup from "yup";
import { Formik } from "formik";
import FieldError from "../components/FieldError";

type Props = NativeStackScreenProps<AuthStackParams, "Signup">;

const validationSchema = yup.object().shape({
  fullName: yup
    .string()
    .required("FullName is required")
    .min(2, ({ min }) => `FirstName must be at least ${min} characters long`)
    .max(20, ({ max }) => `FullName must be maximum ${max} characters long`),
  email: yup
    .string()
    .required("Email address is required")
    .email("Email must be valid email address"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, ({ min }) => `Password must be at least ${min} characters long`),
  confirmPassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password")], "Passwords don't match"),
});

function Signup({ navigation }: Props) {
  const [hidePassword, setHidePassword] = useState<boolean>(true);
  const initialValues: ISignup = {
    email: "",
    fullName: "",
    password: "",
    confirmPassword: "",
  };

  return (
    <Formik
      validateOnMount={true}
      initialValues={initialValues}
      onSubmit={(values) => console.log(values)}
      validationSchema={validationSchema}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        touched,
        errors,
        isValid,
      }) => (
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
              onChangeText={handleChange("fullName")}
              value={values.fullName}
              onBlur={handleBlur("fullName")}
              error={touched.fullName && errors.fullName ? true : false}
            />
            <FieldError
              visible={touched.fullName && errors.fullName ? true : false}
              message={errors.fullName}
            />

            <TextInput
              label="Email"
              mode="outlined"
              left={<TextInput.Icon name="email" />}
              style={styles.textInput}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
              error={touched.email && errors.email ? true : false}
            />
            <FieldError
              visible={touched.email && errors.email ? true : false}
              message={errors.email}
            />

            <TextInput
              label="Password"
              mode="outlined"
              left={<TextInput.Icon name="lock" />}
              onBlur={handleBlur("password")}
              secureTextEntry={hidePassword}
              value={values.password}
              right={
                <TextInput.Icon
                  name={hidePassword ? "eye" : "eye-off"}
                  onPress={() => setHidePassword(!hidePassword)}
                />
              }
              style={styles.textInput}
              onChangeText={handleChange("password")}
              error={touched.password && errors.password ? true : false}
            />
            <FieldError
              visible={touched.password && errors.password ? true : false}
              message={errors.password}
            />

            <TextInput
              label="Confirm Password"
              mode="outlined"
              left={<TextInput.Icon name="lock" />}
              onBlur={handleBlur("confirmPassword")}
              secureTextEntry={hidePassword}
              value={values.confirmPassword}
              right={
                <TextInput.Icon
                  name={hidePassword ? "eye" : "eye-off"}
                  onPress={() => setHidePassword(!hidePassword)}
                />
              }
              style={styles.textInput}
              error={
                touched.confirmPassword && errors.confirmPassword ? true : false
              }
              onChangeText={handleChange("confirmPassword")}
            />
            <FieldError
              visible={
                touched.confirmPassword && errors.confirmPassword ? true : false
              }
              message={errors.confirmPassword}
            />

            <Button
              icon="send"
              mode="contained"
              disabled={!isValid}
              onPress={handleSubmit}
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
      )}
    </Formik>
  );
}

export default Signup;
