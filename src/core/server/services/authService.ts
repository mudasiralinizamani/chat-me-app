import { AxiosResponse } from "axios";
import { ISingin } from "../../../features/auth/interfaces/ISignin.interface";
import ISignup from "../../../features/auth/interfaces/ISignup.interface";
import apiClient from "../apiClient";

const signup = (model: ISignup): Promise<AxiosResponse> => {
  return apiClient.post("/auth/signup", model);
};

const signin = (model: ISingin): Promise<AxiosResponse> => {
  return apiClient.post("/auth/signin", model);
};

export default { signin, signup };
