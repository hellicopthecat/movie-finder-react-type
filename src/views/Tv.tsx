import styled from "styled-components";
import Loading from "../components/utilcomp/Loading";
import Latest from "../components/body/latest/Latest";
import {tvApi} from "../api/api";
import {useQuery} from "react-query";

import RowSlider from "../components/body/rowComp/RowSlider";
import ColumnComp from "../components/body/columnComp/ColumnComp";
import {ITvLatest, ITvResponse} from "../type/apiModel";
import {useRecoilValue, useSetRecoilState} from "recoil";

import {AnimatePresence, motion} from "framer-motion";
import SliderBtn from "../components/utilcomp/SliderBtn";
import {
  airingToday,
  airingTodayToggle,
  onAirTv,
  onAirTvToggle,
} from "../store/atoms";
import {useMatch} from "react-router-dom";

import DetailComp from "./DetailComp";

const TvCont = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 85px;
`;
const OnAirWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 700px;
  overflow: hidden;
`;
const OnAirCont = styled(motion.div)`
  position: absolute;
  display: grid;
  grid-template-columns: repeat(20, 1fr);
`;
const ContWrapper = styled.div`
  position: relative;
`;
const RowSliderCont = styled.div`
  display: flex;
  flex-direction: column;
`;
const RowCont = styled(motion.div)`
  display: grid;
  grid-auto-flow: column;
  position: absolute;
  width: 100%;
`;
const RowSlideHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Title = styled.h2`
  font-size: 30px;
  font-weight: 600;
`;
const ColumSliderCont = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

const TvDetailCont = styled(motion.div)``;
const onAirVariant = {
  hidden: {
    x: window.outerWidth,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.outerWidth,
  },
};
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
const Tv: React.FC = () => {
  //API DATA
  const {data: onTheAirData, isLoading: onTheAirLoading} =
    useQuery<ITvResponse>(["TV", "tvOntheAir"], tvApi.onTheAir);
  const {data: airingTodayData, isLoading: airingTodayLoading} =
    useQuery<ITvResponse>(["TV", "tvAiring"], tvApi.airingToday);
  const {data: popularData, isLoading: popularLoading} = useQuery<ITvResponse>(
    ["TV", "tvPopular"],
    tvApi.popular
  );
  const {data: topRateData, isLoading: topRateLoading} = useQuery<ITvResponse>(
    ["TV", "tvTopRate"],
    tvApi.topRated
  );
  //Variable
  const tvDetailMatch = useMatch("/tv/:id");
  const isLoading =
    onTheAirLoading || airingTodayLoading || popularLoading || topRateLoading;
  const nowOnAirLengh = onTheAirData && onTheAirData.results.length - 1;
  const totalAiring = airingTodayData && airingTodayData?.results.length - 1;
  const totalTv = topRateData && topRateData?.results.length - 1;
  const clickTvDetail = tvDetailMatch?.params.id;

  //States
  const nowOnTvAir = useRecoilValue(onAirTv);
  const airing = useRecoilValue(airingToday);
  const setOnAirTvToggle = useSetRecoilState(onAirTvToggle);
  const setAiringToggle = useSetRecoilState(airingTodayToggle);
  const offset = 6;
  return (
    <TvCont>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <OnAirWrapper>
            <AnimatePresence
              initial={false}
              onExitComplete={() => setOnAirTvToggle((prev) => !prev)}
            >
              <OnAirCont
                variants={onAirVariant}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{type: "tween", duration: 1}}
                key={nowOnTvAir}
              >
                {onTheAirData?.results.map((tv, index) =>
                  nowOnTvAir === index ? (
                    <Latest
                      key={tv.id + tv.name}
                      id={tv.id}
                      title={tv.name !== "" ? tv.name : tv.original_name}
                      posterPath={tv.backdrop_path}
                      overview={tv.overview}
                      contentsLength={Number(nowOnAirLengh)}
                      type="TV"
                    />
                  ) : null
                )}
              </OnAirCont>
            </AnimatePresence>
          </OnAirWrapper>
          <ContWrapper>
            <RowSliderCont>
              <RowSlideHeader>
                <Title>AIRING TODAY</Title>
                <SliderBtn total={Number(totalAiring)} toggleKey="airing" />
              </RowSlideHeader>
              <AnimatePresence
                initial={false}
                onExitComplete={() => setAiringToggle((prev) => !prev)}
              >
                <RowCont
                  variants={sliderVariant}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{tyep: "tween", duration: 1}}
                  key={airing}
                >
                  {airingTodayData?.results
                    .slice(1)
                    .slice(offset * airing, offset * airing + offset)
                    .map((airing) => (
                      <RowSlider
                        key={airing.id}
                        movieID={airing.id}
                        movieTitle={
                          airing.name !== ""
                            ? airing.name
                            : airing.original_name
                        }
                        posterPath={airing.poster_path}
                      />
                    ))}
                </RowCont>
              </AnimatePresence>
            </RowSliderCont>
          </ContWrapper>
          {/* <ContWrapper>
            <AnimatePresence
              initial={false}
              onExitComplete={() => setSubToggleLeaving((prev) => !prev)}
            >
              <Title>TV TOP RATED</Title>
              <SliderBtn total={Number(totalTv)} />
              <RowCont
                variants={sliderVariant}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{tyep: "tween", duration: 1}}
                key={subIndex}
              >
                {topRateData?.results
                  .slice(1)
                  .slice(offset * subIndex, offset * subIndex + offset)
                  .map((topRate) => (
                    <RowSlider
                      key={topRate.id}
                      movieID={topRate.id}
                      movieTitle={
                        topRate.name !== ""
                          ? topRate.name
                          : topRate.original_name
                      }
                      posterPath={topRate.poster_path}
                    />
                  ))}
              </RowCont>
            </AnimatePresence>
          </ContWrapper> */}
          {/* <ContWrapper>
            <Title>UPCOMING MOVIE</Title>
            <ColumSliderCont>
              {popularData?.results.map((popular) => (
                <ColumnComp
                  key={popular.id}
                  movieID={popular.id}
                  movieTitle={
                    popular.name !== "" ? popular.name : popular.original_name
                  }
                  voteAverage={popular.vote_average}
                  posterPath={popular.poster_path}
                  overview={popular.overview}
                />
              ))}
            </ColumSliderCont>
          </ContWrapper> */}
          <AnimatePresence>
            {clickTvDetail && (
              <TvDetailCont layoutId={tvDetailMatch.params.id}>
                <DetailComp id={tvDetailMatch.params.id} />
              </TvDetailCont>
            )}
          </AnimatePresence>
        </>
      )}
    </TvCont>
  );
};
export default Tv;
