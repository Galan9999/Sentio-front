import { renderHook } from "@testing-library/react";
import { errorHandlers, okHandlers } from "../../mocks/handlers";
import { server } from "../../mocks/server";
import Wrapper from "../../mocks/Wrapper";
import FormDataPolyfill from "form-data";
import { loadQuoteActionCreator } from "../../store/features/quote/quoteSlice";
import {
  deleteQuoteByIdActionCreator,
  loadQuotesActionCreator,
} from "../../store/features/quotes/quotesSlice";
import {
  setIsErrorModalActionCreator,
  setIsLoadingActionCreator,
  setIsSuccessModalActionCreator,
  unsetIsLoadingActionCreator,
} from "../../store/features/ui/uiSlice";
import { store } from "../../store/store";
import { QuoteStructure } from "../../types";
import { errorTypes, succesTypes } from "../types";
import useQuotesApi from "./useQuotesApi";

const spiedDispatch = jest.spyOn(store, "dispatch");

const { cuotesNotFoundErrorMessage, defaultErrorMessage } = errorTypes;
const { successDeleting, successCreating } = succesTypes;

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

afterEach(() => jest.clearAllMocks());

const mockedQuotes = {
  quotes: [
    {
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
    },
  ],
};

const mockedQuote: QuoteStructure = {
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

describe("Given the useQuotesApi function", () => {
  describe("When loadQuotes is called and returns a 200 with a list of quotes", () => {
    test("Then it should call dispatch with loadQuotes action", async () => {
      const {
        result: {
          current: { loadQuotes },
        },
      } = renderHook(() => useQuotesApi(), { wrapper: Wrapper });

      await loadQuotes();

      expect(spiedDispatch).toHaveBeenNthCalledWith(
        2,
        loadQuotesActionCreator(mockedQuotes.quotes)
      );
    });
  });
  describe("When there is no quote", () => {
    beforeEach(() => {
      server.use(...errorHandlers);
    });
    test("Then it should return and error with message 'Quote not found!'", async () => {
      const {
        result: {
          current: { loadQuotes },
        },
      } = renderHook(() => useQuotesApi(), { wrapper: Wrapper });

      const setIsErrorModalAction = setIsErrorModalActionCreator(
        cuotesNotFoundErrorMessage
      );

      await loadQuotes();

      expect(spiedDispatch).toHaveBeenCalledWith(setIsLoadingActionCreator());
      expect(spiedDispatch).toHaveBeenCalledWith(setIsErrorModalAction);
      expect(spiedDispatch).toHaveBeenCalledWith(unsetIsLoadingActionCreator());
    });
  });

  describe("When there is a server problem with the response from the api", () => {
    beforeEach(() => {
      server.use(errorHandlers[2]);
    });
    test("Then it should return and error with message 'Something Went Wrong!'", async () => {
      const {
        result: {
          current: { loadQuotes },
        },
      } = renderHook(() => useQuotesApi(), { wrapper: Wrapper });

      await loadQuotes();

      expect(spiedDispatch).toHaveBeenCalledWith(
        setIsErrorModalActionCreator(defaultErrorMessage)
      );
    });
  });

  describe("When its deleteQuoteById function is called", () => {
    test("Then it should call its dispatch method with message 'Successfully deleted!'", async () => {
      const {
        result: {
          current: { deleteQuoteById },
        },
      } = renderHook(() => useQuotesApi(), { wrapper: Wrapper });

      await deleteQuoteById(mockedQuote.id);

      expect(spiedDispatch).toHaveBeenNthCalledWith(
        2,
        deleteQuoteByIdActionCreator(mockedQuote.id)
      );

      expect(spiedDispatch).toHaveBeenNthCalledWith(
        4,
        setIsSuccessModalActionCreator(successDeleting)
      );
    });
  });

  describe("When its deleteQuote function is called but fails", () => {
    beforeEach(() => {
      server.use(...errorHandlers);
    });
    test("Then it should call the dispatch method with setIsErrorModal with the message 'Something Went Wrong'", async () => {
      const {
        result: {
          current: { deleteQuoteById },
        },
      } = renderHook(() => useQuotesApi(), { wrapper: Wrapper });

      await deleteQuoteById(mockedQuote.id);

      expect(spiedDispatch).toHaveBeenNthCalledWith(
        3,
        setIsErrorModalActionCreator(defaultErrorMessage)
      );
    });
  });

  describe("When createQuote is called and returns a 201 with a new quote created", () => {
    test("Then it should call dispatch", async () => {
      const {
        result: {
          current: { createQuote },
        },
      } = renderHook(() => useQuotesApi(), { wrapper: Wrapper });

      const newQuote = new FormDataPolyfill({ readable: true });

      await createQuote(newQuote as unknown as FormData);

      expect(spiedDispatch).toHaveBeenNthCalledWith(
        3,
        setIsSuccessModalActionCreator(successCreating)
      );
    });
  });
  describe("When there is a problem creating", () => {
    beforeEach(() => {
      server.use(...errorHandlers);
    });
    test("Then it should return and error with message 'Something went wrong!'", async () => {
      const {
        result: {
          current: { createQuote },
        },
      } = renderHook(() => useQuotesApi(), { wrapper: Wrapper });

      const newQuote = new FormDataPolyfill({ readable: true });

      const setIsErrorModalAction =
        setIsErrorModalActionCreator(defaultErrorMessage);

      await createQuote(newQuote as unknown as FormData);

      expect(spiedDispatch).toHaveBeenCalledWith(setIsLoadingActionCreator());
      expect(spiedDispatch).toHaveBeenCalledWith(setIsErrorModalAction);
      expect(spiedDispatch).toHaveBeenCalledWith(unsetIsLoadingActionCreator());
    });
  });

  describe("When loadQuote is called and returns a 200 with a quote", () => {
    beforeEach(() => {
      server.use(okHandlers[5]);
    });
    test("Then it should call dispatch with loadQuote action", async () => {
      const {
        result: {
          current: { loadQuote },
        },
      } = renderHook(() => useQuotesApi(), { wrapper: Wrapper });

      await loadQuote(mockedQuote.id);

      const loadQuoteAction = loadQuoteActionCreator(mockedQuote);

      expect(spiedDispatch).toHaveBeenNthCalledWith(2, loadQuoteAction);
    });
  });
  describe("Without quote", () => {
    beforeEach(() => {
      server.use(...errorHandlers);
    });
    test("Then it should return and error with message 'Quote not found!'", async () => {
      const {
        result: {
          current: { loadQuote },
        },
      } = renderHook(() => useQuotesApi(), { wrapper: Wrapper });

      const setIsErrorModalAction = setIsErrorModalActionCreator(
        cuotesNotFoundErrorMessage
      );

      await loadQuote(mockedQuote.id);

      expect(spiedDispatch).toHaveBeenCalledWith(setIsLoadingActionCreator());
      expect(spiedDispatch).toHaveBeenCalledWith(setIsErrorModalAction);
      expect(spiedDispatch).toHaveBeenCalledWith(unsetIsLoadingActionCreator());
    });
  });

  describe("Server problem with the response from the api", () => {
    beforeEach(() => {
      server.use(errorHandlers[6]);
    });
    test("Then it should return and error with message 'Something Went Wrong!'", async () => {
      const {
        result: {
          current: { loadQuote },
        },
      } = renderHook(() => useQuotesApi(), { wrapper: Wrapper });

      await loadQuote(mockedQuote.id);

      expect(spiedDispatch).toHaveBeenNthCalledWith(
        3,
        setIsErrorModalActionCreator(defaultErrorMessage)
      );
    });
  });
});
