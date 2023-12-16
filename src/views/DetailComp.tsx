import {motion} from "framer-motion";
import {useQuery} from "react-query";
import {useMatch, useNavigate} from "react-router-dom";
import styled from "styled-components";
import {movieApi, tvApi} from "../api/api";
import {IMovieDetail, ITvDetail} from "../type/apiModel";
import Loading from "../components/utilcomp/Loading";
import {imgMaker} from "../util/utils";

const Overlay = styled.div`
  z-index: 96;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
`;
const DetailCont = styled(motion.div)`
  z-index: 99;
  position: fixed;
  top: 150px;
  left: 0;
  right: 0;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
`;
const DetailImg = styled.div<{$path: string}>`
  border-radius: 25px 25px 0 0;
  background-color: ${(props) =>
    props.$path === "" || props.$path === null ? props.theme.accetTxt : null};
  background-image: url(${(props) => imgMaker(props.$path)});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  width: 100%;
  height: 500px;
`;
const DetailInfo = styled.div`
  background-color: black;
  padding: 30px;
  width: 100%;
  border-radius: 0 0 25px 25px;
`;
const DetailTitle = styled.h2`
  font-size: 40px;
  font-weight: 600;
  color: ${(props) => props.theme.accetTxt};
  margin-bottom: 20px;
`;
const OverView = styled.p``;
interface IContentID {
  id?: string;
}
const DetailComp: React.FC<IContentID> = ({id}) => {
  //Api
  const {data: movieData, isLoading: movieIsLoading} = useQuery<IMovieDetail>(
    ["MOVIE", "movieDetail", id],
    movieApi.detail
  );

  const {data: tvData, isLoading: tvIsLoading} = useQuery<ITvDetail>(
    ["TV", "tvDetail", id],
    tvApi.detail
  );
  // Variables
  const movieMatch = useMatch("/movie/:id");
  const tvMatch = useMatch("/tv/:id");
  const searchMatch = useMatch("/search/:id");
  const naviagate = useNavigate();

  const isLoading = movieIsLoading || tvIsLoading;
  const backHome = () => {
    if (movieMatch) {
      naviagate("/");
    } else if (tvMatch) {
      naviagate("/tv");
    } else if (searchMatch) {
      naviagate("/search");
    } else {
      naviagate("/");
    }
  };

  return (
    <Overlay onClick={backHome}>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {tvMatch && tvData && (
            <DetailCont>
              <DetailImg $path={tvData.backdrop_path} />
              <DetailInfo>
                <DetailTitle>{tvData.name}</DetailTitle>
                <OverView>{tvData.overview}</OverView>
              </DetailInfo>
            </DetailCont>
          )}
          {movieMatch && movieData && (
            <DetailCont>
              <DetailImg $path={movieData.backdrop_path} />
              <DetailInfo>
                <DetailTitle>{movieData.title}</DetailTitle>
                <OverView>{movieData.overview}</OverView>
              </DetailInfo>
            </DetailCont>
          )}
        </>
      )}
    </Overlay>
  );
};
export default DetailComp;
