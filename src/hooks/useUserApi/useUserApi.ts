import { useAppDispatch } from "../../store/hooks";
import { LoginCredentials, RegisterCredentials } from "../../types";
import {
  setIsLoadingActionCreator,
  setIsErrorModalActionCreator,
  unsetIsLoadingActionCreator,
  setIsSuccessModalActionCreator,
} from "../../store/features/ui/uiSlice";
import {
  loginUserActionCreator,
  logoutUserActionCreator,
} from "../../store/features/user/userSlice";
import { errorTypes, succesTypes } from "../types";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

const ApiUrl = process.env.REACT_APP_URL_API_USERS;
const usersUrl = "/users";
const loginUrl = "/login";
const registerUrl = "/register";

const { defaultErrorMessage } = errorTypes;
const { successRegistering } = succesTypes;

const useUserApi = () => {
  const dispatch = useAppDispatch();
  const uiDispatch = useAppDispatch();
  const navigateTo = useNavigate();

  const registerUser = async (registerCredentials: RegisterCredentials) => {
    try {
      uiDispatch(setIsLoadingActionCreator());
      const response = await fetch(`${ApiUrl}${usersUrl}${registerUrl}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerCredentials),
      });

      if (!response.ok) {
        throw new Error();
      }

      uiDispatch(unsetIsLoadingActionCreator());
      uiDispatch(setIsSuccessModalActionCreator(successRegistering));
      navigateTo(loginUrl);
    } catch (error) {
      uiDispatch(unsetIsLoadingActionCreator());
      uiDispatch(setIsErrorModalActionCreator(defaultErrorMessage));
    }
  };

  const loginUser = async (userCredentials: LoginCredentials) => {
    try {
      uiDispatch(setIsLoadingActionCreator());
      const response = await fetch(`${ApiUrl}${usersUrl}${loginUrl}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userCredentials),
      });

      if (!response.ok) {
        throw new Error();
      }

      const { token } = await response.json();

      localStorage.setItem("token", token);

      dispatch(loginUserActionCreator(token));

      uiDispatch(unsetIsLoadingActionCreator());
    } catch (error) {
      uiDispatch(unsetIsLoadingActionCreator());
      uiDispatch(setIsErrorModalActionCreator(defaultErrorMessage));
    }
  };

  const logOutUser = () => {
    localStorage.removeItem("token");

    dispatch(logoutUserActionCreator());
  };

  const checkStorageToken = useCallback(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }

    dispatch(loginUserActionCreator(token));
  }, [dispatch]);

  return { loginUser, logOutUser, checkStorageToken, registerUser };
};
export default useUserApi;
