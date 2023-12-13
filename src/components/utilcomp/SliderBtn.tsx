import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import styled from "styled-components";
import {direction, topRateMovieIndex, topRateToggle} from "../../store/atoms";

const BtnCont = styled.div`
  /* width: 100%;
  height: 100px;
  position: absolute;
  top: 500%; */
  display: flex;
  justify-content: space-between;
`;
const Btn = styled.button`
  right: 0;
`;
interface ISliderBtn {
  total: number;
  toggleKey: string;
}
const SliderBtn: React.FC<ISliderBtn> = ({total, toggleKey}) => {
  //states
  const [topRateMovieToggle, setTopRateMovieToggle] =
    useRecoilState(topRateToggle);
  const setTopRateMovieIndex = useSetRecoilState(topRateMovieIndex);
  const setDirection = useSetRecoilState(direction);
  //variables
  const toggle = topRateMovieToggle;
  const offset = 6;
  const maxIndex = Math.floor(total / offset) - 1;
  //function
  const decrease = () => {
    if (toggle) return;
    if (toggleKey === "topRateMovie") {
      setTopRateMovieToggle((prev) => !prev);
      setDirection(false);
      setTopRateMovieIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
    }
  };
  const increase = () => {
    if (toggle) return;
    if (toggleKey === "topRateMovie") {
      setTopRateMovieToggle((prev) => !prev);
      setDirection(true);
      setTopRateMovieIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };

  return (
    <BtnCont>
      <Btn onClick={decrease}>
        <svg
          fill="none"
          stroke="white"
          strokeWidth={1.5}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          width={40}
          height={40}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </Btn>
      <Btn onClick={increase}>
        <svg
          fill="none"
          stroke="white"
          strokeWidth={1.5}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          width={40}
          height={40}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </Btn>
    </BtnCont>
  );
};
export default SliderBtn;
