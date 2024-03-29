import { screen } from "@testing-library/react";
import {
  mockedPreloadedStateDetail,
  mockObamaCard,
} from "../../mocks/quotesPreloadedStates";
import renderRouterWithProviders from "../../utils/testUtils/renderRouterWithProviders";
import DetailPage from "./DetailPage";

let mockedLoadQuote = jest.fn();

jest.mock("../../hooks/useQuotesApi/useQuotesApi", () => () => ({
  loadQuote: mockedLoadQuote,
}));

describe("Given the DetaiPage component", () => {
  describe("When its rendered and there is a quote of 'Barack Obama' in the store", () => {
    test("Then it should show a detail of 'Barack Obama'", () => {
      renderRouterWithProviders({
        ui: <DetailPage />,
        preloadedState: mockedPreloadedStateDetail,
      });

      const authorName = screen.getByRole("heading", {
        name: mockObamaCard.author,
        level: 1,
      });

      expect(authorName).toBeInTheDocument();
    });
  });
  test("Then it should call loadQuote function", () => {
    renderRouterWithProviders({
      ui: <DetailPage />,
      preloadedState: mockedPreloadedStateDetail,
    });
    expect(mockedLoadQuote).toBeCalled();
  });
});
