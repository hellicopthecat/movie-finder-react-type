import {motion} from "framer-motion";
import {useNavigate} from "react-router-dom";
import styled from "styled-components";
import Poster from "../components/utilcomp/Poster";

const Overlay = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;
const MovieDetailCont = styled(motion.div)`
  position: absolute;
  top: 200px;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 500px;
  height: 500px;
  background-color: red;
`;

const MovieDetailTitle = styled(motion.h2)``;
interface IUpcomeData {
  movieTitle?: string;
  posterPath?: string;
  overview?: string;
  voteAverage?: number;
}
const MovieDetail: React.FC<IUpcomeData> = ({
  movieTitle,
  posterPath,
  overview,
  voteAverage,
}) => {
  const naviagate = useNavigate();
  const backHome = () => {
    naviagate("/");
  };
  console.log(posterPath);
  return (
    <>
      <Overlay onClick={backHome} />
      <MovieDetailCont>
        {/* <Poster path={} /> */}
        <MovieDetailTitle>{movieTitle}</MovieDetailTitle>
      </MovieDetailCont>
    </>
  );
};
export default MovieDetail;
