import React from "react";
import {
  Colors,
  DefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import Toast from "react-native-toast-message";
import "react-native-gesture-handler";
import Router from "./src/core/routes/Router";

const theme = {
  ...DefaultTheme,
  roundness: 8,
  colors: {
    ...DefaultTheme.colors,
    primary: "#6200EE",
    accent: "#3700B3",
    text: Colors.grey600,
  },
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <Router />
      <Toast visibilityTime={5000} topOffset={45} />
    </PaperProvider>
  );
}
