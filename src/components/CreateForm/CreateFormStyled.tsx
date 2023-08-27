import styled from "styled-components";

const CreateFormStyled = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-inline: 10px;

  .create-form {
    padding-top: 120px;
    border-radius: ${(props) => props.theme.borderRadius};
    padding: 10px;
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
    &__textarea {
      height: 150px;
      font-size: ${(props) => props.theme.fontSize.bigSize};
      color: ${(props) => props.theme.colors.mainTextColor};
      padding: 20px;
      font-family: inherit;
    }

    &__register-section {
      display: flex;
      flex-direction: column;
      text-align: center;
    }
  }

  .button {
    padding: 20px;
  }
`;

export default CreateFormStyled;
