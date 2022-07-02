import AsyncStorage from "@react-native-async-storage/async-storage";
import { IUser } from "../Interfaces/IUser.interface";

const saveTokens = async (token: string, refreshToken: string) => {
  await AsyncStorage.setItem("token", token);
  await AsyncStorage.setItem("refresh_token", refreshToken);
};

const saveUser = async (user: IUser) => {
  saveTokens(user.token, user.refresh_token);

  await AsyncStorage.setItem("user_dms", user.dms.toString());
  await AsyncStorage.setItem("user_email", user.email);
  await AsyncStorage.setItem("user_full_name", user.full_name);
  await AsyncStorage.setItem("user_profile_pic", user.profile_pic);
  await AsyncStorage.setItem("user_id", user.ID);
};

const areTokensSaved = async (): Promise<boolean> => {
  const token = await AsyncStorage.getItem("token");
  const refreshToken = await AsyncStorage.getItem("refresh_token");

  if (token != null && refreshToken !== null) {
    return true;
  }

  return false;
};

export default { saveTokens, saveUser, areTokensSaved };
