import styled from "styled-components";
import Poster from "../../utilcomp/Poster";
import {Link} from "react-router-dom";
import {imgMaker} from "../../../util/utils";

const LatestCont = styled.div<{$path: string}>`
  position: relative;
  width: 100%;
  height: 700px;
  background: url(${(props) => props.$path !== null && imgMaker(props.$path)});
  background-color: ${(props) => props.$path === null && props.theme.accetTxt};
  background-size: cover;
  background-position: center center;
  margin-bottom: 30px;
`;
const LatestGradient = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background: ${(props) =>
    `linear-gradient(transparent, ${props.theme.bgColor})`};
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
  margin-bottom: 20px;
`;
const LatestBtn = styled.span`
  display: inline-flex;
  padding: 10px 20px;
  color: ${(props) => props.theme.txtColor};
  background-color: ${(props) => props.theme.bgColor};
`;
interface ILatest {
  movieID: number;
  posterPath: string;
  title: string;
  overview: string;
}
const Latest: React.FC<ILatest> = ({movieID, posterPath, title, overview}) => {
  return (
    <LatestCont $path={posterPath}>
      <LatestGradient />
      <LatestTextCont>
        <LatestTitle>{title}</LatestTitle>
        <LatestDesc>{overview}</LatestDesc>
        <Link to={`movie/${movieID}`}>
          <LatestBtn>About Movie</LatestBtn>
        </Link>
      </LatestTextCont>
      {/* <Poster path={posterPath} size="original" /> */}
    </LatestCont>
  );
};

export default Latest;
