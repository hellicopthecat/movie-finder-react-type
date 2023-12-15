import styled from "styled-components";
import {motion} from "framer-motion";
import {Link, useMatch} from "react-router-dom";
import {imgMaker} from "../../../util/utils";

const SliderCont = styled(motion.div)<{$path: string}>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 300px;
  background-size: cover;
  background-position: center center;
  background-image: url(${(props) => props.$path});
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const TxtCont = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  opacity: 0;
`;
const RowSliderTitle = styled.h2`
  color: ${(props) => props.theme.txtColor};
  font-size: 20px;
  font-weight: 600;
  text-align: center;
`;
interface IRowSlider {
  id: number;
  movieTitle: string;
  posterPath: string;
}
const sliderVariant = {
  base: {scale: 1},
  hover: {scale: 1.3, zIndex: 80, transition: {delay: 0.5}},
};
const txtVariant = {
  base: {opacity: 0},
  hover: {opacity: 1},
  exit: {opacity: 0},
};
const RowSlider: React.FC<IRowSlider> = ({id, movieTitle, posterPath}) => {
  const movieMatch = useMatch("/");
  const tvMatch = useMatch("/tv");

  return (
    <SliderCont
      variants={sliderVariant}
      initial="base"
      whileHover="hover"
      $path={imgMaker(posterPath)}
      layoutId={id + ""}
    >
      <TxtCont
        variants={txtVariant}
        initial="base"
        whileHover="hover"
        exit="exit"
      >
        <Link
          to={
            movieMatch
              ? `movie/${id + ""}`
              : tvMatch
              ? `/tv/${id + ""}`
              : `/search/${id + ""}`
          }
        >
          <RowSliderTitle>{movieTitle}</RowSliderTitle>
        </Link>
      </TxtCont>
    </SliderCont>
  );
};
export default RowSlider;
