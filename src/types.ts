export interface User {
  token: string;
}

export interface UserState extends User {
  isLogged: boolean;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  email: string;
}

export interface UiStructure {
  isLoading: boolean;
  modal: ModalStructure;
}

export interface ModalStructure {
  message: string;
  isError: boolean;
  isSuccess: boolean;
}

export interface UiLoadingStructure {
  user: { isLogged: boolean; token: string };
  ui: {
    isLoading: boolean;
    modal: { isError: boolean; message: string; isSuccess: boolean };
  };
}

export interface NotLoggedUser {
  user: { isLogged: boolean; token: string };
  ui: {
    isLoading: boolean;
    modal: { isError: boolean; message: string };
  };
}

export interface QuoteStructure {
  id: string;
  owner: string;
  author: string;
  image: string;
  country: string;
  quote: string;
  tags: string;
  lived: string;
  backgroundInfo: string;
}

export interface ApiQuotesStructure {
  quotes: QuotesStructure;
}

export interface QuoteFormStructure
  extends Pick<
    QuoteStructure,
    "author" | "country" | "quote" | "tags" | "lived" | "backgroundInfo"
  > {
  image: File | null;
}

export type QuotesStructure = QuoteStructure[];

export interface StoreStructure {
  user: { isLogged: boolean; token: string };
  ui: {
    isLoading: boolean;
    modal: { isError: boolean; message: string; isSuccess: boolean };
  };
  quotes: QuotesStructure;
}

export interface StoreDetailStructure {
  user: { isLogged: boolean; token: string };
  ui: {
    isLoading: boolean;
    modal: { isError: boolean; message: string; isSuccess: boolean };
  };
  quotes: QuotesStructure;
  quote: QuoteStructure;
}

export interface CustomJwtPayload {
  id: string;
  username: string;
}
