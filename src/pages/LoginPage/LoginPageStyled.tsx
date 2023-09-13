import styled from "styled-components";

const LoginPageStyled = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 140px;
  gap: 20px;

  .login-page {
    &__title {
      text-align: center;
      text-transform: uppercase;
      width: 100%;
    }

    &__register-section {
      display: flex;
      flex-direction: column;
      text-align: center;
    }

    &__register-link {
      color: #14805a;
      width: 100%;
    }
  }
`;

export default LoginPageStyled;
