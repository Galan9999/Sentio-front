import { screen } from "@testing-library/react";
import renderRouterWithProviders from "../../utils/testUtils/renderRouterWithProviders";
import RegisterPage from "./RegisterPage";

describe("Given the LoginPage component", () => {
  describe("When its rendered", () => {
    test("Then it should show a heading with 'register'", () => {
      const headingText = "register";

      renderRouterWithProviders({
        ui: <RegisterPage />,
        preloadedState: {
          user: {
            isLogged: false,
            token: "",
          },
        },
      });

      const renderedTitle = screen.getByRole("heading", {
        name: headingText,
        level: 1,
      });

      expect(renderedTitle).toBeInTheDocument();
    });
  });
});
