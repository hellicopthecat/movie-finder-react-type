import styled, {ThemeProvider} from "styled-components";
import {GlobalStyle} from "./theme/GlobalStyle";
import {useRecoilValue} from "recoil";
import {isDark} from "./store/atoms";
import {darkTheme, lightTheme} from "./theme/theme";
import {Outlet} from "react-router-dom";
import HeaderComp from "./components/main/HeaderComp";
const Wrapper = styled.div`
  padding: 20px 0px;
`;
function App() {
  const darkMode = useRecoilValue(isDark);
  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <GlobalStyle />
      <Wrapper>
        <HeaderComp />
        <Outlet />
      </Wrapper>
    </ThemeProvider>
  );
}

export default App;
