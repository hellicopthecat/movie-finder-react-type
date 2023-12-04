import {Link, useMatch} from "react-router-dom";
import styled from "styled-components";
import Circle from "../utilcomp/Circle";
import {useSetRecoilState} from "recoil";
import {isDark} from "../../store/atoms";
import {
  motion,
  useAnimation,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";

const Header = styled(motion.header)`
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
  width: 25px;
  height: 25px;
  border-radius: 100%;
  background-color: ${(props) => props.theme.accetTxt};
`;
const navVarient = {
  top: {backgroundColor: "#1B262C"},
  scroll: {backgroundColor: "rgba(0,0,0,0.5)"},
};
const HeaderComp = () => {
  const navAnimation = useAnimation();
  const home = useMatch("/");
  const tv = useMatch("/tv");
  const search = useMatch("/search");
  const {scrollY} = useScroll();
  const setThemeMode = useSetRecoilState(isDark);
  useMotionValueEvent(scrollY, "change", (scrollVal) => {
    if (scrollVal > 40) {
      navAnimation.start("scroll");
    } else {
      navAnimation.start("top");
    }
  });
  const onSubmit = () => {};
  return (
    <Header initial="top" variants={navVarient} animate={navAnimation}>
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
      <ThemeBtnCont>
        <ThemeBtn onClick={() => setThemeMode((prev) => !prev)} />
      </ThemeBtnCont>
      <SearchForm onSubmit={onSubmit}>
        <SearchInput type="text" placeholder="Search Media" />
      </SearchForm>
    </Header>
  );
};
export default HeaderComp;
