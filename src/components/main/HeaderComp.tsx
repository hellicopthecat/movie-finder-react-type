import {Link, useMatch} from "react-router-dom";
import styled from "styled-components";
import Circle from "../utilcomp/Circle";
import {useRecoilState} from "recoil";
import {isDark} from "../../store/atoms";

const Header = styled.header`
  position: fixed;
  z-index: 99;
  top: 0;
  left: 0;
  width: 100%;
  height: 105px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => props.theme.bgColor};
`;
const NavCont = styled.nav`
  display: flex;
  align-items: center;
`;
const LogoImg = styled.img`
  width: 200px;
  margin-right: 50px;
`;
const Navlist = styled.ul`
  display: flex;
  justify-content: space-around;
  li {
    font-size: 20px;
    margin-right: 30px;
  }
`;
const SearchForm = styled.form`
  display: flex;
  align-items: center;
  margin-right: 20px;
`;
const SearchInput = styled.input`
  margin: 0 10px;
  padding: 5px 10px;
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 15px;
  &::placeholder {
    color: ${(props) => props.theme.txtColor};
  }
`;
const ThemeBtnCont = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  width: 50px;
  height: 27px;
  border: 2px solid #96c464;
  border-radius: 25px;
  background-color: ${(props) => props.theme.txtColor};
`;
const ThemeBtn = styled.button`
  cursor: pointer;
  width: 25px;
  height: 25px;
  border-radius: 100%;
  background-color: ${(props) => props.theme.accetTxt};
`;
const HeaderComp = () => {
  const home = useMatch("/");
  const tv = useMatch("/tv");
  const search = useMatch("/search");
  const [themeMode, setThemeMode] = useRecoilState(isDark);
  const onClick = () => {
    setThemeMode((prev) => !prev);
  };
  return (
    <Header>
      <NavCont>
        <Link to="/">
          <LogoImg
            src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png"
            alt="logo"
          />
        </Link>
        <Navlist>
          <li>
            <Link to="/">HOME {home && <Circle id="navCircle" />}</Link>
          </li>
          <li>
            <Link to="/tv">TV {tv && <Circle id="navCircle" />}</Link>
          </li>
          <li>
            <Link to="/search">
              Search {search && <Circle id="navCircle" />}
            </Link>
          </li>
        </Navlist>
      </NavCont>
      <ThemeBtnCont onClick={onClick}>
        <ThemeBtn onClick={onClick} />
      </ThemeBtnCont>
      <SearchForm>
        <label htmlFor="">Search</label>
        <SearchInput type="text" placeholder="Search Media" />
      </SearchForm>
    </Header>
  );
};
export default HeaderComp;
