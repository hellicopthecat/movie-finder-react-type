import {motion} from "framer-motion";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {useMatch, useNavigate} from "react-router-dom";
import {useSetRecoilState} from "recoil";
import styled from "styled-components";
import {searchText} from "../../store/atoms";

const SearchForm = styled(motion.form)`
  display: flex;
  justify-content: end;
  align-items: center;
  margin: 0 20px;
`;
const SerachIcon = styled.svg`
  width: 30px;
  height: 30px;
  cursor: pointer;
`;
const SearchInput = styled(motion.input)`
  margin: 0 10px;
  padding: 5px 10px;
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 15px;
  transform-origin: right;
  &::placeholder {
    color: ${(props) => props.theme.accetTxt};
  }
  color: ${(props) => props.theme.accetTxt};
`;
const HomeSearch = () => {
  const [isActive, setActive] = useState(false);
  const navigate = useNavigate();
  const searchMatch = useMatch("/search");
  const {register, watch} = useForm();
  const setSearchText = useSetRecoilState(searchText);
  setSearchText(watch("searchInput"));

  const onClick = async () => {
    setActive((prev) => !prev);
    if (searchMatch) {
      setActive(false);
    }
  };
  const goToSearch = () => {
    if (searchMatch) {
      return;
    }
    navigate("/search");
  };
  return (
    <SearchForm
      initial={{width: isActive ? "30%" : "100%"}}
      animate={{width: isActive ? "100%" : "30%"}}
      transition={{type: "tween", duration: 0.7}}
    >
      <SerachIcon
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        onClick={onClick}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
        />
      </SerachIcon>
      <SearchInput
        initial={{scaleX: isActive ? 0 : 1, width: isActive ? 0 : "100%"}}
        animate={{scaleX: isActive ? 1 : 0, width: isActive ? "100%" : 0}}
        transition={{type: "tween", duration: 0.7}}
        type="text"
        placeholder="Search Media"
        onClick={goToSearch}
        {...register("searchInput")}
      />
    </SearchForm>
  );
};
export default HomeSearch;
