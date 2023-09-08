import React, { useState } from "react";
import useUserApi from "../../hooks/useUserApi/useUserApi";
import { LoginCredentials } from "../../types";
import Button from "../Button/Button";
import LoginFormStyled from "./LoginFormStyled";

const LoginForm = (): React.ReactElement => {
  const { loginUser } = useUserApi();

  const initialState: LoginCredentials = {
    username: "",
    password: "",
  };

  const [loginCredentials, setLoginCredentials] = useState(initialState);
  let { password, username } = loginCredentials;

  const handleUsername = (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();

    username = (event.target as HTMLInputElement).value;

    setLoginCredentials({ password, username });
  };

  const handlePassword = (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();

    password = (event.target as HTMLInputElement).value;

    setLoginCredentials({ password, username });
  };

  const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await loginUser(loginCredentials);

    setLoginCredentials({ ...initialState });
  };

  return (
    <LoginFormStyled className="form" onSubmit={handleOnSubmit}>
      <label className="login-form__label" htmlFor="username">
        username
      </label>
      <input
        onChange={handleUsername}
        value={loginCredentials.username}
        className="login-form__input"
        placeholder="introduce username"
        name="username"
        id="username"
        type="text"
        required
      ></input>

      <label className="login-form__label" htmlFor="password">
        password
      </label>
      <input
        onChange={handlePassword}
        value={loginCredentials.password}
        className="login-form__input"
        placeholder="introduce password"
        name="password"
        id="password"
        type="password"
        required
      ></input>

      <Button className="login-button" text="log-in" />
    </LoginFormStyled>
  );
};

export default LoginForm;
