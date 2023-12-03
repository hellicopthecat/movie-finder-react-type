import styled from "styled-components";
import Poster from "../../utilcomp/Poster";

const SliderCont = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const TxtCont = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
`;
const RowSliderTitle = styled.h2`
  color: ${(props) => props.theme.txtColor};
  font-size: 20px;
  font-weight: 600;
  text-align: center;
`;
interface IRowSlider {
  movieID: number;
  movieTitle: string;
  posterPath: string;
}
const RowSlider: React.FC<IRowSlider> = ({movieID, movieTitle, posterPath}) => {
  return (
    <SliderCont>
      <Poster path={posterPath} width="200px" height="250px" />
      <TxtCont>
        <RowSliderTitle>{movieTitle}</RowSliderTitle>
      </TxtCont>
    </SliderCont>
  );
};
export default RowSlider;
