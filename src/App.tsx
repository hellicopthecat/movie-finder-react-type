import {ThemeProvider} from "styled-components";
import {GlobalStyle} from "./theme/GlobalStyle";
import {useRecoilValue} from "recoil";
import {isDark} from "./store/atoms";
import {darkTheme, lightTheme} from "./theme/theme";
import {Route, Routes} from "react-router-dom";
import HeaderComp from "./components/main/HeaderComp";
import Home from "./views/Home";
import DetailComp from "./views/DetailComp";
import Tv from "./views/Tv";

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
          <Route path="movie/:id" element={<DetailComp />} />
        </Route>
        <Route path="/tv" element={<Tv />}>
          <Route path=":id" element={<DetailComp />} />
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
