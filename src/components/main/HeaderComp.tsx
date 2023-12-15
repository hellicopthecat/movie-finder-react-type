import {Link, useMatch} from "react-router-dom";
import styled from "styled-components";
import Circle from "../utilcomp/Circle";
import {useRecoilState} from "recoil";
import {isDark} from "../../store/atoms";
import {
  motion,
  useAnimation,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import HomeSearch from "../utilcomp/HomeSearch";

const Header = styled(motion.header)`
  position: fixed;
  z-index: 99;
  top: 0;
  left: 0;
  width: 100%;
  height: 85px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${(props) => props.theme.accetTxt};
  background-color: ${(props) => props.theme.bgColor};
`;
const LogoImg = styled.img`
  width: 150px;
  margin-right: 50px;
`;
const NavWrapper = styled.nav`
  display: flex;
  align-items: center;
`;

const NavCont = styled(motion.ul)`
  display: flex;
  justify-content: space-around;
`;
const NavList = styled(motion.div)`
  position: relative;
  font-size: 20px;
  margin-right: 30px;
`;
const ThemeBtnCont = styled.div``;
const ThemeBtnBorder = styled(motion.div)`
  cursor: pointer;
  display: flex;
  align-items: center;
  width: 50px;
  height: 27px;
  border: 2px solid #96c464;
  border-radius: 25px;
  background-color: ${(props) => props.theme.txtColor};
`;
const ThemeBtn = styled(motion.button)<{$mode: boolean}>`
  width: 25px;
  height: 25px;
  border-radius: 100%;
  transform: ${(props) => (props.$mode ? "translateX(0)" : "translateX(100%)")};
  transition: 0.2s ease-in-out;
  background-color: ${(props) => props.theme.accetTxt};
`;
const UtilCont = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
`;
const navVarient = {
  top: {backgroundColor: "#1B262C"},
  scroll: {backgroundColor: "rgba(0,0,0,0.5)"},
};

const HeaderComp = () => {
  const navAnimation = useAnimation();
  const home = useMatch("/");
  const movie = useMatch("/movie/:id");
  const tv = useMatch("/tv");
  const tvDetail = useMatch("/tv/:id");
  const search = useMatch("/search");
  const searchDetail = useMatch("/search/:id");
  const {scrollY} = useScroll();
  const [themeMode, setThemeMode] = useRecoilState(isDark);
  useMotionValueEvent(scrollY, "change", (scrollVal) => {
    if (scrollVal > 80) {
      navAnimation.start("scroll");
    } else {
      navAnimation.start("top");
    }
  });

  return (
    <Header initial="top" variants={navVarient} animate={navAnimation}>
      <NavWrapper>
        <Link to="/">
          <LogoImg
            src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png"
            alt="logo"
          />
        </Link>
        <NavCont>
          <NavList>
            <Link to="/">
              MOVIE
              {(home || movie) && <Circle layoutId="navCircle" />}
            </Link>
          </NavList>
          <NavList>
            <Link to="/tv">
              TV
              {(tv || tvDetail) && <Circle layoutId="navCircle" />}
            </Link>
          </NavList>
          <NavList>
            <Link to="/search">
              Search
              {(search || searchDetail) && <Circle layoutId="navCircle" />}
            </Link>
          </NavList>
        </NavCont>
      </NavWrapper>
      <UtilCont>
        <ThemeBtnCont>
          <ThemeBtnBorder onClick={() => setThemeMode((prev) => !prev)}>
            <ThemeBtn $mode={themeMode} />
          </ThemeBtnBorder>
        </ThemeBtnCont>
        <HomeSearch />
      </UtilCont>
    </Header>
  );
};
export default HeaderComp;
