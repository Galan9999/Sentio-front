import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faInfo } from "@fortawesome/free-solid-svg-icons";
import useQuotesApi from "../../hooks/useQuotesApi/useQuotesApi";
import { useAppSelector } from "../../store/hooks";
import { QuoteStructure } from "../../types";
import Button from "../Button/Button";
import QuoteCardStyled from "./QuoteCardStyled";
import { NavLink } from "react-router-dom";

interface QuoteCardProps {
  quote: QuoteStructure;
}

const QuoteCard = ({ quote }: QuoteCardProps): JSX.Element => {
  const { isLogged } = useAppSelector((state) => state.user);
  const { deleteQuoteById } = useQuotesApi();

  const deleteIcon = (
    <FontAwesomeIcon className="card__icon" icon={faTrashCan} />
  );
  const detailIcon = <FontAwesomeIcon className="card__icon" icon={faInfo} />;

  return (
    <QuoteCardStyled className="card">
      <img
        className="card__image"
        src={quote.image}
        alt={`${quote.author} author`}
        height={130}
        width={130}
      />

      <p className="card__quote" aria-label="a quote from an author">
        {`"${quote.quote}"`}
      </p>

      <h2 className="card__author">{quote.author}</h2>

      <div className="bottom-container">
        <span className="card__tags" aria-label="tags">
          #{quote.tags}
        </span>
        <div className="icons-container">
          <NavLink to={`/detail/${quote.id}`} aria-label="link to detail">
            <Button
              icon={detailIcon}
              className={"detail"}
              ariaLabel={"detail"}
            />
          </NavLink>

          {isLogged && (
            <Button
              icon={deleteIcon}
              className={"delete"}
              ariaLabel={"delete"}
              action={async () => await deleteQuoteById(quote.id)}
            />
          )}
        </div>
      </div>
    </QuoteCardStyled>
  );
};

export default QuoteCard;
