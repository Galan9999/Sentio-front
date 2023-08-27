import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import renderRouterWithProviders from "../../utils/testUtils/renderRouterWithProviders";
import CreateForm from "./CreateForm";
import { mockedPreloadeStoreLoggedState } from "../../mocks/quotesPreloadedStates";

const mockCreateQuote = jest.fn();

jest.mock("../../hooks/useQuotesApi/useQuotesApi.ts", () => () => ({
  createQuote: mockCreateQuote,
}));

describe("Given the CreateForm component", () => {
  describe("When rendered", () => {
    test("Then it should show an input field with a label 'author'", () => {
      const inputLabelText = "author";

      renderRouterWithProviders({ ui: <CreateForm /> });

      const inputField = screen.getByLabelText(inputLabelText);

      expect(inputField).toBeInTheDocument();
    });

    test("Then is should show and input field with label 'image'", () => {
      const inputLableText = "image";

      renderRouterWithProviders({ ui: <CreateForm /> });

      const inputField = screen.getByLabelText(inputLableText);

      expect(inputField).toBeInTheDocument();
    });

    test("Then is should show and input field with label 'country'", () => {
      const inputLableText = "country";

      renderRouterWithProviders({ ui: <CreateForm /> });

      const inputField = screen.getByLabelText(inputLableText);

      expect(inputField).toBeInTheDocument();
    });

    test("Then is should show and input field with label 'quote'", () => {
      const inputLableText = "quote";

      renderRouterWithProviders({ ui: <CreateForm /> });

      const inputField = screen.getByLabelText(inputLableText);

      expect(inputField).toBeInTheDocument();
    });

    test("Then is should show and input field with label 'tags'", () => {
      const inputLableText = "tags";

      renderRouterWithProviders({ ui: <CreateForm /> });

      const inputField = screen.getByLabelText(inputLableText);

      expect(inputField).toBeInTheDocument();
    });

    test("Then is should show and input field with label 'lived'", () => {
      const inputLableText = "lived";

      renderRouterWithProviders({ ui: <CreateForm /> });

      const inputField = screen.getByLabelText(inputLableText);

      expect(inputField).toBeInTheDocument();
    });

    test("Then is should show and input field with label 'backgroundInfo'", () => {
      const inputLableText = "backgroundInfo";

      renderRouterWithProviders({ ui: <CreateForm /> });

      const inputField = screen.getByLabelText(inputLableText);

      expect(inputField).toBeInTheDocument();
    });
  });

  describe("When it is rendered and the button is clicked with the fields written", () => {
    test("Then it should call the  function handleOnSubmit", async () => {
      const inputAuthortext = "author";
      const inputImageText = "image";
      const inputCountryText = "country";
      const inputQuoteText = "quote";
      const inputTagsText = "tags";
      const inputLivedText = "lived";
      const inputBackgroundInfoText = "backgroundInfo";
      const buttonText = "create";

      renderRouterWithProviders({
        ui: <CreateForm />,
        preloadedState: mockedPreloadeStoreLoggedState,
      });

      const renderedAuthortext = screen.getByLabelText(inputAuthortext);
      const renderedImageText = screen.getByLabelText(inputImageText);
      const renderedCountryText = screen.getByLabelText(inputCountryText);
      const renderedQuoteText = screen.getByLabelText(inputQuoteText);
      const renderedTagsText = screen.getByLabelText(inputTagsText);
      const renderedLivedText = screen.getByLabelText(inputLivedText);
      const renderedBackgroundInfoText = screen.getByLabelText(
        inputBackgroundInfoText
      );
      const renderedbutton = screen.getByRole("button", { name: buttonText });

      const content = "Hello World";
      const blob = new Blob([content], { type: "text/plain" });
      const file = new File([blob], "hello.txt");

      await waitFor(async () => {
        await userEvent.type(renderedAuthortext, "René");
        await userEvent.upload(renderedImageText, file);
        await userEvent.type(renderedCountryText, "country");
        await userEvent.type(renderedQuoteText, "quote");
        await userEvent.type(renderedTagsText, "tags");
        await userEvent.type(renderedLivedText, "lived");
        await userEvent.type(renderedBackgroundInfoText, "backgroundInfo");
      });
      await waitFor(async () => {
        await userEvent.click(renderedbutton);
      });

      expect(mockCreateQuote).toBeCalled();
    });
  });
});
