import { NavLink } from "react-router-dom";
import LoginForm from "../../components/LoginForm/LoginForm";
import LoginPageStyled from "./LoginPageStyled";

const LoginPage = (): JSX.Element => {
  return (
    <LoginPageStyled className="login-page">
      <h1 className="login-page__title">log-in</h1>
      <LoginForm />
      <div className="login-page__register-section">
        <span className="login-page__register-text">
          already have an account?
        </span>
        <NavLink
          to={"/register"}
          aria-label="link to register"
          className={"login-page__register-link"}
        >
          register here
        </NavLink>
      </div>
    </LoginPageStyled>
  );
};

export default LoginPage;
