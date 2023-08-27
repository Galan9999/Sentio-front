import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
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
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { QuotesStructure, QuoteStructure } from "../../types";
import { errorTypes, succesTypes } from "../types";

const { defaultErrorMessage, cuotesNotFoundErrorMessage } = errorTypes;
const { successDeleting, successCreating } = succesTypes;

const quotesRelativePath = "/quotes";
const createRealtivePath = "/create";
const home = "/home";

const useQuotesApi = () => {
  const dispatch = useAppDispatch();
  const uiDispatch = useAppDispatch();
  const navigateTo = useNavigate();
  const {
    user: { token },
  } = useAppSelector((store) => store);

  const loadQuotes = useCallback(async () => {
    try {
      uiDispatch(setIsLoadingActionCreator());
      const response = await fetch(
        `${process.env.REACT_APP_URL_API_USERS}${quotesRelativePath}`
      );

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(cuotesNotFoundErrorMessage);
        }
        throw new Error(defaultErrorMessage);
      }
      const { quotes } = (await response.json()) as { quotes: QuotesStructure };

      dispatch(loadQuotesActionCreator(quotes));

      uiDispatch(unsetIsLoadingActionCreator());
    } catch (error) {
      uiDispatch(unsetIsLoadingActionCreator());

      uiDispatch(setIsErrorModalActionCreator((error as Error).message));
    }
  }, [dispatch, uiDispatch]);

  const deleteQuoteById = useCallback(
    async (id: string) => {
      try {
        uiDispatch(setIsLoadingActionCreator());
        const response = await fetch(
          `${process.env.REACT_APP_URL_API_USERS}${quotesRelativePath}/${id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token} `,
            },
          }
        );

        if (!response.ok) {
          throw new Error(defaultErrorMessage);
        }

        dispatch(deleteQuoteByIdActionCreator(id));

        uiDispatch(unsetIsLoadingActionCreator());

        uiDispatch(setIsSuccessModalActionCreator(successDeleting));
      } catch (error) {
        dispatch(unsetIsLoadingActionCreator());

        dispatch(setIsErrorModalActionCreator((error as Error).message));
      }
    },
    [dispatch, uiDispatch, token]
  );

  const createQuote = useCallback(
    async (formData: FormData) => {
      try {
        uiDispatch(setIsLoadingActionCreator());
        const response: Response = await fetch(
          `${process.env.REACT_APP_URL_API_USERS}${quotesRelativePath}${createRealtivePath}`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token} `,
            },
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error(defaultErrorMessage);
        }
        uiDispatch(unsetIsLoadingActionCreator());
        navigateTo(home);
        uiDispatch(setIsSuccessModalActionCreator(successCreating));
      } catch (error) {
        uiDispatch(unsetIsLoadingActionCreator());

        uiDispatch(setIsErrorModalActionCreator((error as Error).message));
      }
    },
    [uiDispatch, navigateTo, token]
  );

  const loadQuote = useCallback(
    async (id: string) => {
      try {
        uiDispatch(setIsLoadingActionCreator());
        const response = await fetch(
          `${process.env.REACT_APP_URL_API_USERS}${quotesRelativePath}/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error(cuotesNotFoundErrorMessage);
          }
          throw new Error(defaultErrorMessage);
        }
        const { quote } = (await response.json()) as {
          quote: QuoteStructure;
        };

        dispatch(loadQuoteActionCreator(quote));

        uiDispatch(unsetIsLoadingActionCreator());
      } catch (error) {
        uiDispatch(unsetIsLoadingActionCreator());

        uiDispatch(setIsErrorModalActionCreator((error as Error).message));
      }
    },
    [dispatch, uiDispatch, token]
  );

  return { loadQuotes, deleteQuoteById, createQuote, loadQuote };
};

export default useQuotesApi;
