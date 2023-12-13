import styled from "styled-components";
import {Link} from "react-router-dom";
import {imgMaker} from "../../../util/utils";
import {AnimatePresence, motion} from "framer-motion";
import {useState} from "react";

const LatestCont = styled(motion.div)<{$path: string}>`
  position: relative;
  width: 99vw;
  height: 700px;
  background: ${(props) =>
    `url(${props.$path !== null && imgMaker(props.$path, "original")})`};
  background-color: ${(props) => props.$path === null && props.theme.accetTxt};
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
`;
const LatestGradient = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background: ${(props) =>
    `linear-gradient(transparent 60%, ${props.theme.bgColor}) 40%`};
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
const NowPlayBtnCont = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  left: 0;
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
    </LatestCont>
  );
};

export default Latest;
