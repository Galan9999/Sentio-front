import { QuoteStructure } from "../../../types";
import { loadQuoteActionCreator, quoteReducer } from "./quoteSlice";

describe("Given the quote reducer function", () => {
  describe("When its called with loadQuote action", () => {
    test("Then it should return a quote", () => {
      const currentQuoteState: QuoteStructure = {
        id: "",
        owner: "",
        author: "",
        image: "",
        country: "",
        quote: "",
        tags: "",
        lived: "",
        backgroundInfo: "",
      };

      const expectedQuoteState: QuoteStructure = {
        id: "",
        owner: "",
        author: "Albert Einstein",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Albert_Einstein_Head.jpg/440px-Albert_Einstein_Head.jpg",
        country: "Germany",
        quote:
          "Imagination is more important than knowledge. Knowledge is limited. Imagination encircles the world.",
        tags: "philosophers",
        lived: "1879 - 1955",
        backgroundInfo:
          "Albert Einstein was a German-born theoretical physicist who developed the theory of relativity, one of the two pillars of modern physics.",
      };

      const newQuoteState = quoteReducer(
        currentQuoteState,
        loadQuoteActionCreator(expectedQuoteState)
      );

      expect(newQuoteState).toStrictEqual(expectedQuoteState);
    });
  });
});
