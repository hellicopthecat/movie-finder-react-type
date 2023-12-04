import styled from "styled-components";
import Loading from "../components/utilcomp/Loading";
import Latest from "../components/body/latest/Latest";
import {movieApi} from "../api/api";
import {useQuery} from "react-query";
import {IMovieLatest, IMovieResults} from "../type/apiModel";
import RowSlider from "../components/body/rowComp/RowSlider";
import ColumnComp from "../components/body/columnComp/ColumnComp";
import {Link, Outlet} from "react-router-dom";
import SliderBtn from "../components/utilcomp/SliderBtn";
import {AnimatePresence, motion} from "framer-motion";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {sliderIndex, toggleLeaving} from "../store/atoms";

const HomeCont = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-top: 85px;
`;
const ContWrapper = styled.div`
  position: relative;
  &:nth-child(2) {
    margin-bottom: 350px;
  }
  &:nth-child(3) {
    padding: 30px;
  }
`;
const RowSliderCont = styled.div`
  position: relative;
  display: flex;
`;
const RowCont = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
  top: 50px;
`;
const Title = styled.h2`
  font-size: 30px;
  font-weight: 600;
  margin-bottom: 20px;
`;
const ColumSliderCont = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;
const sliderVariant = {
  hidden: {
    x: window.outerWidth + 10,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.outerWidth - 10,
  },
};
const Home: React.FC = () => {
  const offset = 6;
  const index = useRecoilValue(sliderIndex);
  const setToggleLeaving = useSetRecoilState(toggleLeaving);
  const {data: latestData, isLoading: latestLoading} = useQuery<IMovieLatest>(
    ["movie", "movieLatest"],
    movieApi.latest
  );
  const {data: topRateData, isLoading: topRateLoading} =
    useQuery<IMovieResults>(["movie", "movieTopRate"], movieApi.topRated);
  const {data: upcomingData, isLoading: upcomingLoading} =
    useQuery<IMovieResults>(["movie", "movieUpcoming"], movieApi.upcoming);

  const isLoading = latestLoading || topRateLoading || upcomingLoading;

  const totalMovie = topRateData && topRateData?.results.length - 1;

  return (
    <HomeCont>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {latestData && (
            <Latest
              movieID={latestData.id}
              title={
                latestData.title !== ""
                  ? latestData.title
                  : latestData.original_title
              }
              posterPath={latestData.poster_path}
              overview={latestData.overview}
            />
          )}
          <ContWrapper>
            <RowSliderCont>
              <Title>MOVIE TOP RATED</Title>
              <AnimatePresence
                initial={false}
                onExitComplete={() => setToggleLeaving((prev) => !prev)}
              >
                <RowCont
                  variants={sliderVariant}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{tyep: "tween", duration: 1}}
                  key={index}
                >
                  {topRateData?.results
                    .slice(1)
                    .slice(offset * index, offset * index + offset)
                    .map((rate) => (
                      <RowSlider
                        key={rate.id}
                        movieID={rate.id}
                        movieTitle={
                          rate.title !== "" ? rate.title : rate.original_title
                        }
                        posterPath={rate.poster_path}
                      />
                    ))}
                </RowCont>
              </AnimatePresence>
              <SliderBtn total={Number(totalMovie)} />
            </RowSliderCont>
          </ContWrapper>
          <ContWrapper>
            <Title>UPCOMING MOVIE</Title>
            <ColumSliderCont>
              {upcomingData?.results.map((upcome) => (
                <Link to={`movie/${upcome.id + ""}`} key={upcome.id}>
                  <ColumnComp
                    movieID={upcome.id}
                    movieTitle={
                      upcome.title !== "" ? upcome.title : upcome.original_title
                    }
                    voteAverage={upcome.vote_average}
                    posterPath={upcome.poster_path}
                    overview={upcome.overview}
                  />
                </Link>
              ))}
            </ColumSliderCont>
          </ContWrapper>
        </>
      )}
      <Outlet />
    </HomeCont>
  );
};
export default Home;
