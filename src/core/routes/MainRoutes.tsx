import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";

import AuthStack from "./AuthStack";
import AppStack from "./AppStack";

const MainRoutes = () => {
  const [userAuthenticated, setUserAuthenticated] = useState<boolean>(false);
  return (
    <NavigationContainer>
      {userAuthenticated ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default MainRoutes;
