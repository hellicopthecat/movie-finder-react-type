import {useRecoilState, useSetRecoilState} from "recoil";
import styled from "styled-components";
import {sliderIndex, toggleLeaving} from "../../store/atoms";

const Btn = styled.button`
  position: absolute;
  z-index: 89;
  right: 0;
`;
interface ISliderBtn {
  total: number;
}
const SliderBtn: React.FC<ISliderBtn> = ({total}) => {
  const setIndex = useSetRecoilState(sliderIndex);
  const [leaving, setLeaving] = useRecoilState(toggleLeaving);
  const offset = 6;
  const maxIndex = Math.floor(total / offset) - 1;
  const increase = () => {
    if (leaving) return;
    setLeaving((prev) => !prev);
    setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
  };

  return (
    <>
      <Btn onClick={increase}>
        <svg
          width="50"
          fill="none"
          stroke="white"
          strokeWidth={1.5}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </Btn>
    </>
  );
};
export default SliderBtn;
