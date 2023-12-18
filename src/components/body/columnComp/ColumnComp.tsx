import styled from "styled-components";
import Poster from "../../utilcomp/Poster";
import Voteaverage from "../../utilcomp/Voteaverage";

const UpcomeList = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
`;
const UpcomeTxt = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 30px;
  width: 70%;
`;
const UpcomeTitle = styled.h2`
  font-size: 35px;
  font-weight: 600;
  margin-bottom: 20px;
  color: ${(props) => props.theme.titleColor};
`;
const UpcomeDesc = styled.p`
  width: 70%;
  line-height: 23px;
`;
interface IColumnList {
  movieTitle: string;
  posterPath: string;
  overview: string;
  voteAverage: number;
}
const ColumnComp: React.FC<IColumnList> = ({
  movieTitle,
  posterPath,
  overview,
  voteAverage,
}) => {
  return (
    <UpcomeList>
      <Poster path={posterPath} width="200px" height="250px" />
      <UpcomeTxt>
        <UpcomeTitle>{movieTitle}</UpcomeTitle>
        <Voteaverage score={voteAverage} />
        <UpcomeDesc>
          {overview.length > 100 ? `${overview.slice(0, 100)} ...` : overview}
        </UpcomeDesc>
      </UpcomeTxt>
    </UpcomeList>
  );
};
export default ColumnComp;
