import styled from "styled-components";

const RegisterFormStyled = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-inline: 10px;

  .register-form {
    &__input {
      height: 60px;
      font-size: ${(props) => props.theme.fontSize.bigSize};
      color: ${(props) => props.theme.colors.mainTextColor};
      padding: 20px;
    }
    &__label {
      text-transform: capitalize;
      font-size: ${(props) => props.theme.fontSize.bigSize};
    }
    border-radius: ${(props) => props.theme.borderRadius};
    padding: 10px;

    &__register-section {
      display: flex;
      flex-direction: column;
      text-align: center;
    }
  }
  .register-button {
    margin: 20px;
    padding: 20px;
  }
`;

export default RegisterFormStyled;
