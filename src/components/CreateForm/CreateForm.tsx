import jwt_decode from "jwt-decode";
import { useState } from "react";
import useQuotesApi from "../../hooks/useQuotesApi/useQuotesApi";
import { CustomJwtPayload, QuoteFormStructure } from "../../types";
import Button from "../Button/Button";
import CreateFormStyled from "./CreateFormStyled";
import { useAppSelector } from "../../store/hooks";

const CreateForm = (): JSX.Element => {
  const {
    user: { token },
  } = useAppSelector((state) => state);
  const { createQuote } = useQuotesApi();

  const initialState: QuoteFormStructure = {
    author: "",
    backgroundInfo: "",
    image: null,
    country: "",
    lived: "",
    quote: "",
    tags: "",
  };

  const [formData, setFormData] = useState(initialState);

  const handleInputChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = event.target;
    setFormData({ ...formData, [name]: files?.[0] });
  };

  const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { id }: CustomJwtPayload = jwt_decode(token);

    const newQuote = new FormData(event.currentTarget);

    newQuote.append("creationTime", `${new Date(Date.now()).toUTCString()}`);

    newQuote.append("owner", id);

    await createQuote(newQuote);
    setFormData({ ...initialState });
  };

  return (
    <CreateFormStyled className="form" onSubmit={handleOnSubmit}>
      <label className="create-form__label" htmlFor="author">
        author
      </label>
      <input
        onChange={handleInputChange}
        value={formData.author}
        className="create-form__input"
        placeholder="introduce author"
        name="author"
        id="author"
        type="text"
        autoComplete="off"
        required
      ></input>

      <label className="create-form__label" htmlFor="image">
        image
      </label>
      <input
        onChange={handleImageChange}
        className="create-form__input"
        placeholder="introduce image"
        name="image"
        id="image"
        type="file"
        autoComplete="off"
        required
      ></input>

      <label className="create-form__label" htmlFor="country">
        country
      </label>
      <input
        onChange={handleInputChange}
        value={formData.country}
        className="create-form__input"
        placeholder="introduce country"
        name="country"
        id="country"
        type="text"
        autoComplete="off"
        required
      ></input>

      <label className="create-form__label" htmlFor="quote">
        quote
      </label>
      <input
        onChange={handleInputChange}
        value={formData.quote}
        className="create-form__input"
        placeholder="introduce quote"
        name="quote"
        id="quote"
        type="text"
        autoComplete="off"
        required
      ></input>

      <label className="create-form__label" htmlFor="tags">
        tags
      </label>
      <input
        onChange={handleInputChange}
        value={formData.tags}
        className="create-form__input"
        placeholder="introduce tags"
        name="tags"
        id="tags"
        type="text"
        autoComplete="off"
        required
      ></input>

      <label className="create-form__label" htmlFor="lived">
        lived
      </label>
      <input
        onChange={handleInputChange}
        value={formData.lived}
        className="create-form__input"
        placeholder="introduce lived"
        name="lived"
        id="lived"
        type="text"
        autoComplete="off"
        required
      ></input>

      <label className="create-form__label" htmlFor="backgroundInfo">
        backgroundInfo
      </label>
      <textarea
        onChange={handleInputChange}
        value={formData.backgroundInfo}
        className="create-form__input create-form__textarea"
        placeholder="introduce backgroundInfo"
        name="backgroundInfo"
        id="backgroundInfo"
        autoComplete="off"
        required
      />

      <Button text="create" className="button" />
    </CreateFormStyled>
  );
};

export default CreateForm;
