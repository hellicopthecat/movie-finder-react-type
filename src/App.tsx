import styled, {ThemeProvider} from "styled-components";
import {GlobalStyle} from "./theme/GlobalStyle";
import {useRecoilValue} from "recoil";
import {isDark} from "./store/atoms";
import {darkTheme, lightTheme} from "./theme/theme";
import {HashRouter, Outlet, Route, Routes} from "react-router-dom";
import HeaderComp from "./components/main/HeaderComp";
import Home from "./views/Home";
import MovieDetail from "./views/MovieDetail";
import Tv from "./views/Tv";
import TvDetail from "./views/TvDetail";
import Search from "./views/Search";
import ErrorPage from "./views/ErrorPage";
// const Wrapper = styled.div`
//   padding: 20px 0px;
// `;
function App() {
  const darkMode = useRecoilValue(isDark);
  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <GlobalStyle />
      <HeaderComp />
      <Routes>
        <Route index element={<Home />} />
        <Route element={<Home />}>
          <Route path="movie/:id" element={<MovieDetail />} />
        </Route>
        <Route path="/tv" element={<Tv />}>
          <Route path=":id" element={<TvDetail />} />
        </Route>
        <Route path="/search" element={<Search />} />

        <Route path="/*" element={<ErrorPage />} />
      </Routes>
      {/* <Wrapper>
        <HeaderComp />
        <Outlet />
      </Wrapper> */}
    </ThemeProvider>
  );
}

export default App;
