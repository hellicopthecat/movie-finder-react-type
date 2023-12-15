import {useForm} from "react-hook-form";
import {useQuery} from "react-query";
import styled from "styled-components";
import {movieApi, tvApi} from "../api/api";
import Loading from "../components/utilcomp/Loading";
import {IMovieResults, ITvResponse} from "../type/apiModel";
import ColumnComp from "../components/body/columnComp/ColumnComp";
import {Link, useParams} from "react-router-dom";
import {AnimatePresence, motion} from "framer-motion";
import DetailComp from "./DetailComp";

const PageWrapper = styled.div`
  margin-top: 90px;
  padding: 30px;
`;
const SearchWrapper = styled.div``;
const SearchForm = styled.form`
  padding: 30px;
`;
const SearchCont = styled.div`
  display: flex;
  flex-direction: column;
`;
const SearchLabel = styled.label`
  font-size: 25px;
  font-weight: 600;
  margin-bottom: 20px;
`;
const SearchInput = styled.input`
  color: ${(props) => props.theme.accetTxt};
  padding: 20px 30px;
  border: none;
  border-radius: 15px;
  &::placeholder {
    color: ${(props) => props.theme.accetTxt};
  }
`;
const HorizontalBreark = styled.hr`
  border: ${(props) => `1px solid ${props.theme.accetTxt}`};
`;
const ResultWrapper = styled.div``;
type IInputs = {
  searchInput: string;
};
const ContentsResultWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const ResultCont = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;
`;
const ResultTitle = styled.h2`
  margin: 30px 0;
  font-size: 30px;
  font-weight: 700;
`;
const SearchDetail = styled(motion.div)``;
const Search = () => {
  const {register, watch} = useForm<IInputs>();
  const searchTxt = watch("searchInput");
  //Api data
  const {data: movieData, isLoading: movieIsLoading} = useQuery<IMovieResults>(
    ["MOVIE", "searchMovie", searchTxt],
    movieApi.search
  );
  const {data: tvData, isLoading: tvIsLoading} = useQuery<ITvResponse>(
    ["TV", "searchTv", searchTxt],
    tvApi.search
  );
  const {id} = useParams();

  const isLoading = movieIsLoading || tvIsLoading;
  return (
    <PageWrapper>
      <SearchWrapper>
        <SearchForm>
          <SearchCont>
            <SearchLabel>검색어 입력</SearchLabel>
            <SearchInput
              placeholder="검색어를 입력해주세요"
              {...register("searchInput", {required: true})}
            />
          </SearchCont>
        </SearchForm>
      </SearchWrapper>
      <HorizontalBreark />
      <ResultWrapper>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            {movieData && movieData?.results.length > 0 && (
              <ContentsResultWrapper>
                <ResultTitle>영화 검색 결과</ResultTitle>
                <ResultCont>
                  {movieData?.results.map((movie) => (
                    <Link to={`/search/${movie.id}`}>
                      <SearchDetail layoutId={movie.id + ""}>
                        <ColumnComp
                          key={movie.id + movie.original_title}
                          movieID={movie.id}
                          movieTitle={movie.title}
                          overview={movie.overview}
                          posterPath={movie.poster_path}
                          voteAverage={movie.vote_average}
                        />
                      </SearchDetail>
                    </Link>
                  ))}
                </ResultCont>
              </ContentsResultWrapper>
            )}
            {tvData && tvData?.results.length > 0 && (
              <ContentsResultWrapper>
                <ResultTitle>TV 검색 결과</ResultTitle>
                <ResultCont>
                  {tvData.results.map((tv) => (
                    <SearchDetail layoutId={tv.id + ""} key={tv.id + tv.name}>
                      <Link to={`/search/${tv.id}`}>
                        <ColumnComp
                          movieID={tv.id}
                          movieTitle={tv.name}
                          overview={tv.overview}
                          posterPath={tv.poster_path}
                          voteAverage={tv.vote_average}
                        />
                      </Link>
                    </SearchDetail>
                  ))}
                </ResultCont>
              </ContentsResultWrapper>
            )}
          </>
        )}
      </ResultWrapper>
      {id && (
        <AnimatePresence>
          <SearchDetail layoutId={id}>
            <DetailComp id={id} />
          </SearchDetail>
        </AnimatePresence>
      )}
    </PageWrapper>
  );
};
export default Search;
