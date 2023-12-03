import styled from "styled-components";
import Loading from "../components/utilcomp/Loading";
import Latest from "../components/body/latest/Latest";
import {movieApi} from "../api/api";
import {useQuery} from "react-query";
import {IMovieLatest, IMovieResults} from "../type/apiModel";
import RowSlider from "../components/body/rowComp/RowSlider";
import ColumnComp from "../components/body/columnComp/ColumnComp";

const HomeCont = styled.div`
  margin-top: 85px;
`;
const ContWrapper = styled.div`
  padding: 20px;
  overflow: hidden;
`;
const RowSliderCont = styled.div`
  display: grid;
  grid-auto-flow: column;
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

const Home: React.FC = () => {
  const {data: latestData, isLoading: latestLoading} = useQuery<IMovieLatest>(
    ["movie", "movieLatest"],
    movieApi.latest
  );
  const {data: topRateData, isLoading: topRateLoading} =
    useQuery<IMovieResults>(["movie", "movieTopRate"], movieApi.topRated);
  const {data: upcomingData, isLoading: upcomingLoading} =
    useQuery<IMovieResults>(["movie", "movieUpcoming"], movieApi.upcoming);

  const isLoading = latestLoading || topRateLoading || upcomingLoading;
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
            <Title>MOVIE TOP RATED</Title>
            <RowSliderCont>
              {topRateData?.results.map((rate) => (
                <RowSlider
                  key={rate.id}
                  movieID={rate.id}
                  movieTitle={
                    rate.title !== "" ? rate.title : rate.original_title
                  }
                  posterPath={rate.poster_path}
                />
              ))}
            </RowSliderCont>
            <Title>UPCOMING MOVIE</Title>
            <ColumSliderCont>
              {upcomingData?.results.map((upcome) => (
                <ColumnComp
                  key={upcome.id}
                  movieID={upcome.id}
                  movieTitle={
                    upcome.title !== "" ? upcome.title : upcome.original_title
                  }
                  voteAverage={upcome.vote_average}
                  posterPath={upcome.poster_path}
                  overview={upcome.overview}
                />
              ))}
            </ColumSliderCont>
          </ContWrapper>
        </>
      )}
    </HomeCont>
  );
};
export default Home;
