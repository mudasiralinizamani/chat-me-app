import React from "react";
import MainRoutes from "./src/core/routes/MainRoutes";
import {
  Colors,
  DefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";

const theme = {
  ...DefaultTheme,
  roundness: 8,
  colors: {
    ...DefaultTheme.colors,
    primary: "#FEDBD0",
    accent: "#442C2E",
    text: Colors.grey600,
  },
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <MainRoutes />
    </PaperProvider>
  );
}
