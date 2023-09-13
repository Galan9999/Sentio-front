import { screen, waitFor } from "@testing-library/react";
import LoginPage from "./LoginPage";
import renderRouterWithProviders from "../../utils/testUtils/renderRouterWithProviders";
import userEvent from "@testing-library/user-event";

describe("Given the LoginPage component", () => {
  describe("When its rendered", () => {
    test("Then it should show a heading with 'log-in'", () => {
      renderRouterWithProviders({
        ui: <LoginPage />,
        preloadedState: {
          user: {
            isLogged: false,
            token: "",
          },
        },
      });

      const renderedTitle = screen.getByRole("heading", {
        name: "log-in",
      });

      expect(renderedTitle).toBeInTheDocument();
    });
  });
  describe("When the register link is clicked", () => {
    test("Then it should show navigate to RegisterPage with a 'register' heading", async () => {
      const registerRoute = "link to register";
      const registerTitleText = "register";

      renderRouterWithProviders({
        ui: <LoginPage />,
        preloadedState: {
          user: { isLogged: false, token: "" },
        },
      });

      const registerLink = screen.getByRole("link", {
        name: registerRoute,
      });

      await waitFor(async () => {
        await userEvent.click(registerLink);
      });

      const registerTitle = screen.getByRole("heading", {
        name: registerTitleText,
        level: 1,
      });

      expect(registerTitle).toBeInTheDocument();
    });
  });
});
