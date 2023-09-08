import { useState } from "react";
import useUserApi from "../../hooks/useUserApi/useUserApi";
import { RegisterCredentials } from "../../types";
import Button from "../Button/Button";
import RegisterFormStyled from "./RegsiterFormStyled";

const RegisterFrom = (): React.ReactElement => {
  const { registerUser } = useUserApi();

  const initialState: RegisterCredentials = {
    username: "",
    email: "",
    password: "",
  };

  const [registerCredentials, setRegisterCredentials] = useState(initialState);
  let { username, email, password } = registerCredentials;

  const handleMail = (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();

    email = (event.target as HTMLInputElement).value;

    setRegisterCredentials({ password, username, email });
  };

  const handlePassword = (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();

    password = (event.target as HTMLInputElement).value;

    setRegisterCredentials({ password, username, email });
  };

  const handleUsername = (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();

    username = (event.target as HTMLInputElement).value;

    setRegisterCredentials({ password, username, email });
  };

  const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await registerUser(registerCredentials);

    setRegisterCredentials({ ...initialState });
  };

  return (
    <RegisterFormStyled className="form" onSubmit={handleOnSubmit}>
      <label className="register-form__label" htmlFor="email">
        email
      </label>
      <input
        onChange={handleMail}
        value={registerCredentials.email}
        className="register-form__input"
        placeholder="introduce email"
        name="email"
        id="email"
        type="email"
        required
      ></input>

      <label className="register-form__label" htmlFor="password">
        password
      </label>
      <input
        onChange={handlePassword}
        value={registerCredentials.password}
        className="register-form__input"
        placeholder="introduce password"
        name="password"
        id="password"
        type="password"
        required
      ></input>

      <label className="register-form__label" htmlFor="username">
        username
      </label>
      <input
        onChange={handleUsername}
        value={registerCredentials.username}
        className="register-form__input"
        placeholder="introduce username"
        name="username"
        id="username"
        type="text"
        required
      ></input>

      <Button className="register-button" text="sign-in" />
    </RegisterFormStyled>
  );
};

export default RegisterFrom;
