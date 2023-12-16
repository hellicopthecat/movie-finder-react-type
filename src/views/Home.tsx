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

import {
  nowMoviePlay,
  nowMoviePlayToggle,
  topRateMovieIndex,
  topRateMovieToggle,
} from "../store/atoms";
import DetailComp from "./DetailComp";

const HomeCont = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 85px;
`;
const NowPlayWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 700px;
  overflow: hidden;
`;
const NowPlayCont = styled(motion.div)`
  position: absolute;
  display: grid;
  grid-template-columns: repeat(20, 1fr);
`;

const MovieContWrapper = styled.div`
  position: relative;
  padding: 30px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const RowSliderCont = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 350px;
`;
const RowSliderHeader = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const RowCont = styled(motion.div)`
  margin-top: 40px;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  width: 100%;
  position: absolute;
  top: 20px;
`;
const Title = styled.h2`
  font-size: 30px;
  font-weight: 800;
`;
const UpcomingWrapper = styled.div`
  position: relative;
  margin-top: 60px;
`;
const UpcomingCont = styled.div`
  margin-top: 40px;
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
  const clickMovieDetail = movieDetailMatch?.params.id;

  //States
  const nowPlayMovie = useRecoilValue(nowMoviePlay);
  const setNowPlayToggle = useSetRecoilState(nowMoviePlayToggle);
  const topRateMovie = useRecoilValue(topRateMovieIndex);
  const setTopRateMovieToogle = useSetRecoilState(topRateMovieToggle);
  const offset = 6;
  return (
    <HomeCont>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <NowPlayWrapper>
            <AnimatePresence
              initial={false}
              onExitComplete={() => setNowPlayToggle((prev) => !prev)}
            >
              <NowPlayCont
                variants={nowVariant}
                initial="base"
                animate="active"
                exit="end"
                transition={{type: "tween", duration: 1}}
                key={nowPlayMovie}
              >
                {nowData?.results.map((nowMovie, index) =>
                  nowPlayMovie === index ? (
                    <Latest
                      key={nowMovie.original_title + nowMovie.id}
                      id={nowMovie.id}
                      title={
                        nowMovie.title !== ""
                          ? nowMovie.title
                          : nowMovie.original_title
                      }
                      posterPath={nowMovie.backdrop_path}
                      overview={nowMovie.overview}
                      contentsLength={Number(nowMovieLength)}
                      type="MOVIE"
                    />
                  ) : null
                )}
              </NowPlayCont>
            </AnimatePresence>
          </NowPlayWrapper>
          <MovieContWrapper>
            <RowSliderCont>
              <RowSliderHeader>
                <Title>TOP RATED</Title>
                <SliderBtn
                  total={Number(totalMovie)}
                  toggleKey="topRateMovie"
                />
              </RowSliderHeader>
              <AnimatePresence
                initial={false}
                onExitComplete={() => setTopRateMovieToogle((prev) => !prev)}
              >
                <RowCont
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
                        id={rate.id}
                        movieTitle={
                          rate.title !== "" ? rate.title : rate.original_title
                        }
                        posterPath={rate.poster_path}
                      />
                    ))}
                </RowCont>
              </AnimatePresence>
            </RowSliderCont>
            <UpcomingWrapper>
              <Title>UPCOMING</Title>
              <UpcomingCont>
                {upcomingData?.results.map((upcome) => (
                  <AnimatePresence>
                    <ColumnSliderCont
                      key={upcome.id + upcome.original_title}
                      layoutId={upcome.id + ""}
                    >
                      <Link to={`movie/${upcome.id}`}>
                        <ColumnComp
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
                  </AnimatePresence>
                ))}
              </UpcomingCont>
            </UpcomingWrapper>
          </MovieContWrapper>
          <AnimatePresence>
            {clickMovieDetail && (
              <MovieDetailCont layoutId={movieDetailMatch.params.id}>
                <DetailComp id={movieDetailMatch.params.id} />
              </MovieDetailCont>
            )}
          </AnimatePresence>
        </>
      )}
    </HomeCont>
  );
};
export default Home;
