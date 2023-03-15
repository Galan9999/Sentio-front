import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import renderWithRouters, {
  RouterRenderOptions,
} from "../../utils/testUtils/renderWithRouters";
import Header from "./Header";

describe("Given the Header component", () => {
  describe("When its rendered", () => {
    test("Then it should show the sentio's logo", () => {
      const expectedAriaLabelText =
        "logo of a brain with sentio written on the bottom";

      renderWithRouters({ ui: <Header /> });

      const logoIcon = screen.getByLabelText(expectedAriaLabelText);

      expect(logoIcon).toBeInTheDocument();
    });

    test("Then it should show login logo", () => {
      const expectedAriaLabelText = "link to login";

      renderWithRouters({ ui: <Header /> });

      const LoginIcon = screen.getByLabelText(expectedAriaLabelText);

      expect(LoginIcon).toBeInTheDocument();
    });

    test("Then it should show home logo", () => {
      const expectedAriaLabelText = "link to home";

      renderWithRouters({ ui: <Header /> });

      const HomeIcon = screen.getByLabelText(expectedAriaLabelText);

      expect(HomeIcon).toBeInTheDocument();
    });
  });

  describe("When it is rendered with a user logged in and user click on logout button", () => {
    test("Then it should show a", async () => {
      const myListRoute = "link to my list";

      const routerState: RouterRenderOptions = {
        preloadedState: {
          user: { isLogged: true, token: "token" },
        },
      };

      renderWithRouters(routerState);

      const myListLink = screen.getByRole("link", { name: myListRoute });

      await waitFor(async () => {
        await userEvent.click(myListLink);
      });

      const loginLink = screen.getByRole("link", {
        name: myListRoute,
      });

      expect(loginLink).toBeInTheDocument();
    });
  });
});
