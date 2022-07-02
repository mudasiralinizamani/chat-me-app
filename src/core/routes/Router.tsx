import React, { useEffect, useState } from "react";
import { EventRegister } from "react-native-event-listeners";
import authHelper from "../helpers/authHelper";
import AppStack from "./AppStack";
import AuthStack from "./AuthStack";

const Router = () => {
  const [iseUserAuthenticated, setIsUserAuthenticated] =
    useState<boolean>(false);

  useEffect(() => {
    const listener = EventRegister.addEventListener(
      "iseUserAuthenticated",
      (data) => {
        setIsUserAuthenticated(data);
      }
    );

    authHelper.areTokensSaved().then((res) => {
      if (res === true) {
        EventRegister.removeEventListener(listener);
        setIsUserAuthenticated(true);
      }
    });
  }, []);

  return iseUserAuthenticated ? <AppStack /> : <AuthStack />;
};

export default Router;
