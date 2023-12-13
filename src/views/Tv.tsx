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

const TvCont = styled.div`
  margin-top: 85px;
`;
const ContWrapper = styled.div`
  position: relative;
  margin-bottom: 350px;
`;
const RowSliderCont = styled(motion.div)`
  display: grid;
  grid-auto-flow: column;
  position: absolute;
  width: 100%;
  margin-bottom: 50px;
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
const Tv: React.FC = () => {
  const offset = 6;

  const {data: latestData, isLoading: latestLoading} = useQuery<ITvLatest>(
    ["TV", "tvLatest"],
    tvApi.latest
  );
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

  const isLoading =
    latestLoading || airingTodayLoading || popularLoading || topRateLoading;
  const totalAiring = airingTodayData && airingTodayData?.results.length - 1;
  const totalTv = topRateData && topRateData?.results.length - 1;
  return (
    <TvCont>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {latestData && (
            <Latest
              movieID={latestData.id}
              title={
                latestData.name !== ""
                  ? latestData.name
                  : latestData.original_name
              }
              posterPath={latestData.poster_path}
              overview={latestData.overview}
            />
          )}
          {/* <ContWrapper>
            <Title>AIRING TODAY</Title>
            <AnimatePresence
              initial={false}
              onExitComplete={() => setToggleLeaving((prev) => !prev)}
            >
              <SliderBtn total={Number(totalAiring)} />
              <RowSliderCont
                variants={sliderVariant}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{tyep: "tween", duration: 1}}
                key={mainIndex}
              >
                {airingTodayData?.results
                  .slice(1)
                  .slice(offset * mainIndex, offset * mainIndex + offset)
                  .map((airing) => (
                    <RowSlider
                      key={airing.id}
                      movieID={airing.id}
                      movieTitle={
                        airing.name !== "" ? airing.name : airing.original_name
                      }
                      posterPath={airing.poster_path}
                    />
                  ))}
              </RowSliderCont>
            </AnimatePresence>
          </ContWrapper> */}
          {/* <ContWrapper>
            <AnimatePresence
              initial={false}
              onExitComplete={() => setSubToggleLeaving((prev) => !prev)}
            >
              <Title>TV TOP RATED</Title>
              <SliderBtn total={Number(totalTv)} />
              <RowSliderCont
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
              </RowSliderCont>
            </AnimatePresence>
          </ContWrapper> */}
          <ContWrapper>
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
          </ContWrapper>
        </>
      )}
    </TvCont>
  );
};
export default Tv;
