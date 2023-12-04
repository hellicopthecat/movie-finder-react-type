import styled from "styled-components";
import {imgMaker} from "../../util/utils";

const PosterCont = styled.div``;
const PosterImg = styled.img<{$imgheight: string; $imgwidth: string}>`
  width: ${(props) => props.$imgwidth};
  height: ${(props) => props.$imgheight};
`;
const NonPosterImg = styled.div`
  width: 100%;
  height: 700px;
  background-color: ${(props) => props.theme.accetTxt};
`;
interface IPoster {
  path: string;
  size?: string;
  width?: string;
  height?: string;
}
const Poster: React.FC<IPoster> = ({
  path,
  width = "100%",
  height = "700px",
  size,
}) => {
  return (
    <PosterCont>
      {path !== null ? (
        <PosterImg
          src={imgMaker(path, size)}
          alt="PosterImg"
          $imgwidth={width}
          $imgheight={height}
        />
      ) : (
        <NonPosterImg />
      )}
    </PosterCont>
  );
};

export default Poster;
