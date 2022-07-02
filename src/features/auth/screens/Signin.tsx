import { ScrollView, Image, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../../../../assets/styles/features/auth/screens/SigninStyles";
import { Button, Colors, Paragraph, TextInput } from "react-native-paper";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import AuthStackParams from "src/core/routes/AuthStackParams";
import * as yup from "yup";
import { ISingin } from "../interfaces/ISignin.interface";
import FieldError from "../components/FieldError";
import { Formik } from "formik";
import authService from "../../../core/server/services/authService";
import { AxiosError } from "axios";
import Toast from "react-native-toast-message";
import authHelper from "../../../core/helpers/authHelper";
import { EventRegister } from 'react-native-event-listeners'


type Props = NativeStackScreenProps<AuthStackParams, "Signin">;

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email address is required")
    .email("Email must be valid email address"),
  password: yup.string().required("Password is required"),
});

const Signin = ({ navigation }: Props) => {
  const [hidePassword, setHidePassword] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const initialValues: ISingin = {
    email: "",
    password: "",
  };

  const submit = (model: ISingin) => {
    setIsLoading(true);
    authService
      .signin(model)
      .then((res) => {
        setIsLoading(false);
        console.log(res.data);
        authHelper.saveUser(res.data?.user);
        Toast.show({
          text1: "Successfully Signed In",
          text2: "You are Successfully Signed In",
        });
        return EventRegister.emit("iseUserAuthenticated", true)
      })
      .catch((err: AxiosError) => {
        setIsLoading(false);
        if (err.response.data.code === "EmailNotFound") {
          return Toast.show({
            text1: "Email Not Found",
            type: "error",
            text2: "This Email address does not exist",
          });
        } else if (err.response?.data.code === "IncorrectPassword") {
          return Toast.show({
            text1: "Incorrect Password",
            type: "error",
            text2: "This Password is Incorrect",
          });
        }
        return Toast.show({
          text1: "Something Went Wrong",
          type: "error",
        });
      });
  };

  return (
    <Formik
      validateOnMount={true}
      initialValues={initialValues}
      onSubmit={(values) => submit(values)}
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
              source={require("../../../../assets/images/chatme.png")}
              style={styles.logo}
            />
            <Text style={styles.header}>Chat Me</Text>

            <TextInput
              label="Email"
              mode="outlined"
              left={<TextInput.Icon name="email" />}
              style={styles.textInput}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              textContentType="emailAddress"
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

            <Button
              icon="login"
              mode="contained"
              disabled={!isValid}
              onPress={handleSubmit}
              loading={isLoading}
              style={styles.button}
            >
              Sign In
            </Button>

            <TouchableOpacity
              style={{ marginVertical: 35 }}
              onPress={() => navigation.navigate("Signup")}
            >
              <Paragraph style={{ color: Colors.blue400 }}>
                Don't have an account? Create here
              </Paragraph>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      )}
    </Formik>
  );
};

export default Signin;
