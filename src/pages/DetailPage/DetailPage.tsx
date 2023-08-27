import { useEffect } from "react";
import { useParams } from "react-router";
import Detail from "../../components/Detail/Detail";
import useQuotesApi from "../../hooks/useQuotesApi/useQuotesApi";
import { useAppSelector } from "../../store/hooks";
import DetailPageStyled from "./DetailPageStyled";

const DetailPage = (): JSX.Element => {
  const { loadQuote } = useQuotesApi();
  const { id } = useParams();
  useEffect(() => {
    loadQuote(id!);
  }, [loadQuote, id]);

  const { quote } = useAppSelector((state) => state);
  const {
    ui: { isLoading },
  } = useAppSelector((state) => state);

  return (
    <>
      {!isLoading && (
        <DetailPageStyled className="detail-container">
          <Detail quote={quote} />
        </DetailPageStyled>
      )}
    </>
  );
};

export default DetailPage;
