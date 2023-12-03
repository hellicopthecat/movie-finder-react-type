import styled from "styled-components";
import Poster from "../../utilcomp/Poster";

const LatestCont = styled.div`
  position: relative;
  background: linear-gradient(90deg, "transparent", "#000");
  margin-bottom: 30px;
`;
const LatestTextCont = styled.div`
  position: absolute;
  bottom: 0;
  z-index: 90;
  display: flex;
  flex-direction: column;
  margin: 60px 30px;
`;
const LatestTitle = styled.h2`
  font-weight: 700;
  font-size: 40px;
  margin-bottom: 20px;
`;
const LatestDesc = styled.p`
  width: 60%;
  font-size: 20px;
`;
interface ILatest {
  movieID: number;
  posterPath: string;
  title: string;
  overview: string;
}
const Latest: React.FC<ILatest> = ({movieID, posterPath, title, overview}) => {
  return (
    <LatestCont>
      <LatestTextCont>
        <LatestTitle>{title}</LatestTitle>
        <LatestDesc>{overview}</LatestDesc>
      </LatestTextCont>
      <Poster path={posterPath} size="original" />
    </LatestCont>
  );
};

export default Latest;
