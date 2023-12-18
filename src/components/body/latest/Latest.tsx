import styled from "styled-components";
import {useMatch, useNavigate} from "react-router-dom";
import {imgMaker} from "../../../util/utils";
import {motion} from "framer-motion";
import {useRecoilState, useSetRecoilState} from "recoil";
import {
  nowMoviePlay,
  nowMoviePlayToggle,
  onAirTv,
  onAirTvToggle,
} from "../../../store/atoms";

const LatestCont = styled(motion.div)<{$path: string}>`
  width: 100vw;
  height: 700px;
  background: ${(props) =>
    `url(${props.$path !== null && imgMaker(props.$path, "original")})`};
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
`;
const LatestGradient = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  transition: 0.3s ease-in-out;
  background: ${(props) =>
    `linear-gradient(transparent 60%, ${props.theme.bgColor}) 40%`};
`;
const LatestTextWrapper = styled.div`
  position: absolute;
  bottom: 0;
  z-index: 90;
  display: flex;
  flex-direction: column;
  margin: 60px 30px;
`;
const LatestTextCont = styled.div`
  padding: 30px;
  width: 70%;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 20px;
`;
const LatestTitle = styled.h2`
  font-weight: 700;
  font-size: 40px;
  margin-bottom: 20px;
  color: ${(props) => props.theme.titleColor};
`;
const LatestDesc = styled.p`
  width: 100%;
  font-size: 20px;
  margin-bottom: 20px;
  line-height: 22px;
`;
const LatestBtn = styled(motion.span)`
  cursor: pointer;
  display: inline-flex;
  padding: 10px 20px;
  color: ${(props) => props.theme.titleColor};
  background-color: ${(props) => props.theme.bgColor};
  transition: 0.3s ease-in-out;
`;
const NowPlayBtnCont = styled.div``;
const NextSlideBtn = styled(LatestBtn)`
  margin-left: 10px;
`;
interface ILatest {
  id: number;
  posterPath: string;
  title: string;
  overview: string;
  contentsLength?: number;
  type?: "MOVIE" | "TV";
}

const Latest: React.FC<ILatest> = ({
  id,
  posterPath,
  title,
  overview,
  contentsLength,
  type,
}) => {
  const setNowPlayMovie = useSetRecoilState(nowMoviePlay);
  const setOnAirTv = useSetRecoilState(onAirTv);
  const [nowPlayToggle, setNowPlayToggle] = useRecoilState(nowMoviePlayToggle);
  const [nowOnAirToggle, setNowOnAirToggle] = useRecoilState(onAirTvToggle);
  const navigate = useNavigate();
  const movie = useMatch("/");
  const tv = useMatch("/tv");
  const goToPage = () => {
    if (movie) {
      navigate(`/movie/${id}`);
    }
    if (tv) {
      navigate(`/tv/${id}`);
    }
  };
  const nextItem = () => {
    if (type === "MOVIE") {
      if (nowPlayToggle) return;
      setNowPlayToggle((prev) => !prev);
      setNowPlayMovie((prev) => (prev === contentsLength ? 0 : prev + 1));
    }
    if (type === "TV") {
      if (nowOnAirToggle) return;
      setNowOnAirToggle((prev) => !prev);
      setOnAirTv((prev) => (prev === contentsLength ? 0 : prev + 1));
    }
  };
  return (
    <LatestCont $path={posterPath}>
      <LatestGradient />
      <LatestTextWrapper>
        <LatestTextCont>
          <LatestTitle>{title}</LatestTitle>
          <LatestDesc>{overview}</LatestDesc>
          <NowPlayBtnCont>
            <LatestBtn onClick={goToPage}>About Movie</LatestBtn>
            <NextSlideBtn onClick={nextItem}>Next</NextSlideBtn>
          </NowPlayBtnCont>
        </LatestTextCont>
      </LatestTextWrapper>
    </LatestCont>
  );
};

export default Latest;
