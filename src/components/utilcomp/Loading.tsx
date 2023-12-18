import styled from "styled-components";

const LoadingCont = styled.div`
  display: flex;
  justify-content: center;
  margin: 40px;
`;
const LoadingTxt = styled.h2`
  font-size: 30px;
  font-weight: 700;
`;
const Loading = () => {
  return (
    <LoadingCont>
      <LoadingTxt>Loading...</LoadingTxt>
    </LoadingCont>
  );
};
export default Loading;
