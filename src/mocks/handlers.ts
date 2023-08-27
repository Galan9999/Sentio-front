import { rest } from "msw";
import { errorTypes } from "../hooks/types";
import { QuoteStructure } from "../types";

const {
  unauthorizedErrorMessage,
  cuotesNotFoundErrorMessage,
  defaultErrorMessage,
  createError,
} = errorTypes;

const quotesRelativePath = "/quotes";
const byIdRelativePath = "/:id";
const loginRealtivePath = "/users/login";
const createRelativePath = "/create";
const registerRelativePath = "/users/register";

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

const mockedQuote = {
  quote: {
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
};

const mockedNewQuote: QuoteStructure = {
  id: "",
  author: "Frida Kahlo",
  owner: "",
  image:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Frida_Kahlo%2C_by_Guillermo_Kahlo.jpg/440px-Frida_Kahlo%2C_by_Guillermo_Kahlo.jpg",
  country: "Mexico",
  quote: "Feet, what do I need them for if I have wings to fly?",
  tags: "artists",
  lived: "1907 - 1954",
  backgroundInfo:
    "Frida Kahlo was a Mexican painter known for her self-portraits, which often incorporated elements of her physical and emotional pain.",
};

// src/mocks/handlers.js
const useUserApiUrl = process.env.REACT_APP_URL_API_USERS;

export const okHandlers = [
  rest.post(`${useUserApiUrl}${loginRealtivePath}`, async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ token: "token" }));
  }),

  rest.get(`${useUserApiUrl}${quotesRelativePath}`, async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockedQuotes));
  }),

  rest.delete(
    `${useUserApiUrl}${quotesRelativePath}${byIdRelativePath}`,
    async (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(mockedQuotes));
    }
  ),

  rest.post(
    `${useUserApiUrl}${quotesRelativePath}${createRelativePath}`,
    async (req, res, ctx) => {
      return res(ctx.status(201), ctx.json({ mockedNewQuote }));
    }
  ),

  rest.post(
    `${useUserApiUrl}${registerRelativePath}`,
    async (req, res, ctx) => {
      return res(
        ctx.status(201),
        ctx.json({ message: "user successfully created!" })
      );
    }
  ),

  rest.get(
    `${useUserApiUrl}${quotesRelativePath}/${mockedQuote.quote.id}`,
    async (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(mockedQuote));
    }
  ),
];

export const errorHandlers = [
  rest.post(`${useUserApiUrl}${loginRealtivePath}`, async (req, res, ctx) => {
    return res(ctx.status(401), ctx.json({ error: unauthorizedErrorMessage }));
  }),

  rest.get(`${useUserApiUrl}${quotesRelativePath}`, async (req, res, ctx) => {
    return res(
      ctx.status(404),
      ctx.json({ error: cuotesNotFoundErrorMessage })
    );
  }),
  rest.get(`${useUserApiUrl}${quotesRelativePath}`, async (req, res, ctx) => {
    return res(ctx.status(500), ctx.json({ error: defaultErrorMessage }));
  }),
  rest.delete(
    `${useUserApiUrl}${quotesRelativePath}${byIdRelativePath}`,
    async (req, res, ctx) => {
      return res(ctx.status(404), ctx.json({ error: defaultErrorMessage }));
    }
  ),
  rest.post(
    `${useUserApiUrl}${quotesRelativePath}${createRelativePath}`,
    async (req, res, ctx) => {
      return res(ctx.status(404), ctx.json({ error: createError }));
    }
  ),
  rest.get(
    `${useUserApiUrl}${quotesRelativePath}/${mockedQuote.quote.id}`,
    async (req, res, ctx) => {
      return res(
        ctx.status(404),
        ctx.json({ error: cuotesNotFoundErrorMessage })
      );
    }
  ),
  rest.get(
    `${useUserApiUrl}${quotesRelativePath}/${mockedQuote.quote.id}`,
    async (req, res, ctx) => {
      return res(ctx.status(500), ctx.json({ error: defaultErrorMessage }));
    }
  ),

  rest.post(
    `${useUserApiUrl}${registerRelativePath}`,
    async (req, res, ctx) => {
      return res(ctx.status(409), ctx.json({ error: defaultErrorMessage }));
    }
  ),
];
