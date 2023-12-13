import styled from "styled-components";
import Loading from "../components/utilcomp/Loading";
import Latest from "../components/body/latest/Latest";
import {movieApi} from "../api/api";
import {useQuery} from "react-query";
import {IMovieResults} from "../type/apiModel";
import RowSlider from "../components/body/rowComp/RowSlider";
import ColumnComp from "../components/body/columnComp/ColumnComp";
import {Link, useMatch} from "react-router-dom";
import SliderBtn from "../components/utilcomp/SliderBtn";
import {AnimatePresence, motion} from "framer-motion";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {useState} from "react";
import {direction, topRateMovieIndex, topRateToggle} from "../store/atoms";
import MovieDetail from "./MovieDetail";

const HomeCont = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-top: 85px;
`;

const NowPlayWrapper = styled(motion.div)`
  position: absolute;
  display: flex;
`;
const ContWrapper = styled.div`
  position: relative;
  top: 750px;
  padding: 30px;

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
  justify-content: space-between;
  align-items: center;
`;
const RowCont = styled(motion.div)`
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
  top: 50px;
`;
const Title = styled.h2`
  font-size: 30px;
  font-weight: 800;
`;
const ColumSliderWrapper = styled.div`
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;
const ColumnSliderCont = styled(motion.ul)``;
const MovieDetailCont = styled(motion.div)`
  position: fixed;
  z-index: 95;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;
const sliderVariant = {
  hidden: (custom: boolean) => ({
    x: custom ? window.outerWidth + 10 : -window.outerWidth - 10,
  }),
  visible: {
    x: 0,
  },
  exit: (custom: boolean) => ({
    x: custom ? -window.outerWidth - 10 : window.outerWidth + 10,
  }),
};
const nowVariant = {
  base: {x: window.outerWidth},
  active: {x: 0},
  end: {x: -window.outerWidth},
};

const Home: React.FC = () => {
  //API DATA
  const {data: nowData, isLoading: nowLoading} = useQuery<IMovieResults>(
    ["movie", "movieNow"],
    movieApi.nowPlaying
  );
  const {data: topRateData, isLoading: topRateLoading} =
    useQuery<IMovieResults>(["movie", "movieTopRate"], movieApi.topRated);
  const {data: upcomingData, isLoading: upcomingLoading} =
    useQuery<IMovieResults>(["movie", "movieUpcoming"], movieApi.upcoming);

  //Variable
  const isLoading = nowLoading || topRateLoading || upcomingLoading;
  const movieDetailMatch = useMatch("/movie/:id");
  const nowMovieLength = nowData && nowData?.results.length - 1;
  const totalMovie = topRateData && topRateData?.results.length - 1;
  const clickMovieDetail =
    movieDetailMatch?.params.id &&
    upcomingData?.results.map(
      (movie) => movie.id === Number(movieDetailMatch.params.id)
    );
  //States
  const [nowPlayMovie, setNowPlayMovie] = useState(0);
  const [nowPlayToggle, setNowPlayToggle] = useState(false);
  const offset = 6;
  const topRateMovie = useRecoilValue(topRateMovieIndex);
  const direct = useRecoilValue(direction);
  const setTopRateToogle = useSetRecoilState(topRateToggle);

  //functions
  const nowPlayClick = () => {
    if (nowPlayToggle) return;
    setNowPlayToggle((prev) => !prev);
    setNowPlayMovie((prev) => (prev === nowMovieLength ? 0 : prev + 1));
  };

  return (
    <HomeCont>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <AnimatePresence
            initial={false}
            onExitComplete={() => setNowPlayToggle((prev) => !prev)}
          >
            <NowPlayWrapper
              variants={nowVariant}
              initial="base"
              animate="active"
              exit="end"
              transition={{type: "tween", duration: 1}}
              key={nowPlayMovie}
              onClick={nowPlayClick}
            >
              {nowData?.results.map((nowMovie, index) =>
                nowPlayMovie === index ? (
                  <Latest
                    key={nowMovie.original_title + nowMovie.id}
                    movieID={nowMovie.id}
                    title={
                      nowMovie.title !== ""
                        ? nowMovie.title
                        : nowMovie.original_title
                    }
                    posterPath={nowMovie.backdrop_path}
                    overview={nowMovie.overview}
                  />
                ) : null
              )}
            </NowPlayWrapper>
          </AnimatePresence>

          <ContWrapper>
            <RowSliderCont>
              <Title>TOP RATED</Title>
              <AnimatePresence
                initial={false}
                onExitComplete={() => setTopRateToogle((prev) => !prev)}
              >
                <RowCont
                  custom={direct}
                  variants={sliderVariant}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{tyep: "tween", duration: 1}}
                  key={topRateMovie}
                >
                  {topRateData?.results
                    .slice(1)
                    .slice(
                      offset * topRateMovie,
                      offset * topRateMovie + offset
                    )
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
              <SliderBtn total={Number(totalMovie)} toggleKey="topRateMovie" />
            </RowSliderCont>
          </ContWrapper>
          <ContWrapper>
            <Title>UPCOMING</Title>
            <ColumSliderWrapper>
              {upcomingData?.results.map((upcome) => (
                <>
                  <ColumnSliderCont
                    key={upcome.id + upcome.original_title}
                    layoutId={upcome.id + ""}
                  >
                    <Link to={`movie/${upcome.id}`}>
                      <ColumnComp
                        movieID={upcome.id}
                        movieTitle={
                          upcome.title !== ""
                            ? upcome.title
                            : upcome.original_title
                        }
                        voteAverage={upcome.vote_average}
                        posterPath={upcome.poster_path}
                        overview={upcome.overview}
                      />
                    </Link>
                  </ColumnSliderCont>
                  {clickMovieDetail && (
                    <MovieDetailCont layoutId={movieDetailMatch.params.id}>
                      <MovieDetail
                        movieTitle={
                          clickMovieDetail && upcome.title !== ""
                            ? upcome.title
                            : upcome.original_title
                        }
                        posterPath={clickMovieDetail && upcome.poster_path}
                        overview={clickMovieDetail && upcome.overview}
                        voteAverage={clickMovieDetail && upcome.vote_average}
                      />
                    </MovieDetailCont>
                  )}
                </>
              ))}
            </ColumSliderWrapper>
          </ContWrapper>
        </>
      )}
    </HomeCont>
  );
};
export default Home;
