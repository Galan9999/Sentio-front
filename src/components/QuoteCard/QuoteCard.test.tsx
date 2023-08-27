import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { mockedPreloadeStoreLoggedState } from "../../mocks/quotesPreloadedStates";
import { QuoteStructure } from "../../types";
import renderRouterWithProviders, {
  RouterRenderOptions,
} from "../../utils/testUtils/renderRouterWithProviders";
import QuoteCard from "./QuoteCard";

const mockDeleteQuote = jest.fn();

jest.mock("../../hooks/useQuotesApi/useQuotesApi", () => () => ({
  deleteQuoteById: mockDeleteQuote,
}));

const mockCard: QuoteStructure = {
  id: "1",
  owner: "",
  author: "Frida Kahlo",
  image:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Frida_Kahlo%2C_by_Guillermo_Kahlo.jpg/440px-Frida_Kahlo%2C_by_Guillermo_Kahlo.jpg",
  country: "Mexico",
  quote: "Feet, what do I need them for if I have wings to fly?",
  tags: "artists",
  lived: "1907 - 1954",
  backgroundInfo:
    "Frida Kahlo was a Mexican painter known for her self-portraits, which often incorporated elements of her physical and emotional pain.",
};

describe("Given the QuoteCard component", () => {
  describe("When its rendered", () => {
    test("Then it should show a card of Frida Kahlo", () => {
      const expectedAriaLabelTextName = "Frida Kahlo";

      renderRouterWithProviders({
        ui: <QuoteCard quote={mockCard} />,
      });

      const authorName = screen.getByRole("heading", {
        name: expectedAriaLabelTextName,
        level: 2,
      });

      expect(authorName).toBeInTheDocument();
    });
  });

  describe("When a logged user press delete button", () => {
    test("Then it should call deletQuoteById function", async () => {
      const routeAndState: RouterRenderOptions = {
        ui: <QuoteCard quote={mockCard} />,
        preloadedState: mockedPreloadeStoreLoggedState,
      };

      renderRouterWithProviders(routeAndState);

      const renderedButton = screen.getByRole("button", { name: "delete" });

      await waitFor(async () => {
        await userEvent.click(renderedButton);
      });

      expect(mockDeleteQuote).toBeCalledWith(mockCard.id);
    });
  });
});
