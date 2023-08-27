import { QuotesStructure } from "../../../types";
import {
  deleteQuoteByIdActionCreator,
  loadQuotesActionCreator,
  quotesReducer,
} from "./quotesSlice";

describe("Given the quotes reducer function", () => {
  describe("When its called with loadQuotes action", () => {
    test("Then it should return a list of quotes", () => {
      const currentQuotesState: QuotesStructure = [
        {
          id: "",
          owner: "",
          author: "",
          image: "",
          country: "",
          quote: "",
          tags: "",
          lived: "",
          backgroundInfo: "",
        },
      ];
      const expectedQuotesState: QuotesStructure = [
        {
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
        },
      ];

      const newQuotesState = quotesReducer(
        currentQuotesState,
        loadQuotesActionCreator(expectedQuotesState)
      );

      expect(newQuotesState).toStrictEqual(expectedQuotesState);
    });
  });
  describe("When its called with deletQuoteById action", () => {
    test("Then it should return a state without that quote", () => {
      const currentQuotesState: QuotesStructure = [
        {
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
        },
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
      ];
      const expectedQuotesState: QuotesStructure = [
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
      ];

      const newQuotesState = quotesReducer(
        currentQuotesState,
        deleteQuoteByIdActionCreator(currentQuotesState[0].id)
      );

      expect(newQuotesState).toStrictEqual(expectedQuotesState);
    });
  });
});
