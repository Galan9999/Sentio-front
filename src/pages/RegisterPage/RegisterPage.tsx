import RegisterForm from "../../components/RegisterForm/RegsiterForm";
import RegisterPageStyled from "./RegisterPageStyled";

const RegisterPage = (): JSX.Element => {
  return (
    <RegisterPageStyled className="register-page">
      <h1 className="register-page__title">register</h1>
      <RegisterForm />
    </RegisterPageStyled>
  );
};

export default RegisterPage;
