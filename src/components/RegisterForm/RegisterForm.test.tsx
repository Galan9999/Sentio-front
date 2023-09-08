import { screen, waitFor } from "@testing-library/react";
import renderRouterWithProviders from "../../utils/testUtils/renderRouterWithProviders";
import RegisterFrom from "./RegsiterForm";
import userEvent from "@testing-library/user-event";

const mockRegisterUser = jest.fn();

jest.mock("../../hooks/useUserApi/useUserApi.ts", () => () => ({
  registerUser: mockRegisterUser,
}));

describe("Given the RegsiterForm component", () => {
  describe("When rendered", () => {
    test('Then it should show a button with area-label text "sign-in"', () => {
      const buttonText = "sign-in";

      renderRouterWithProviders({ ui: <RegisterFrom /> });

      const renderedbutton = screen.getByRole("button", { name: buttonText });

      expect(renderedbutton).toBeInTheDocument();
    });
  });

  describe("When its rendered and the button is clicked with filled fields", () => {
    test("Then it should call the registerUser function", async () => {
      const emailInputText = "email";
      const passwordInputText = "password";
      const usernameInputText = "username";
      const buttonText = "sign-in";

      renderRouterWithProviders({ ui: <RegisterFrom /> });

      const renderedEmailInput = screen.getByLabelText(emailInputText);
      const renderedPasswordInput = screen.getByLabelText(passwordInputText);
      const renderedUsernameInput = screen.getByLabelText(usernameInputText);
      const renderedButton = screen.getByRole("button", {
        name: buttonText,
      });

      await waitFor(async () => {
        await userEvent.type(renderedEmailInput, "tarairo@gmail.com");
        await userEvent.type(renderedPasswordInput, "12345678");
        await userEvent.type(renderedUsernameInput, "galan99");
        await userEvent.click(renderedButton);
      });

      const expectedCall = {
        email: "tarairo@gmail.com",
        password: "12345678",
        username: "galan99",
      };

      expect(mockRegisterUser).toBeCalledWith(expectedCall);
    });
  });
});
