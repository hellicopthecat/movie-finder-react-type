import {motion, useScroll} from "framer-motion";
import {useMatch, useNavigate} from "react-router-dom";
import styled from "styled-components";

const Overlay = styled.div`
  z-index: 96;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;
const DetailCont = styled(motion.div)`
  z-index: 99;
  position: fixed;
  top: 200px;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: red;
`;
const DetailInfo = styled.div`
  background-color: black;
  padding: 30px;
`;
const DetailTitle = styled.h2`
  background-color: orange;
`;
const OverView = styled.p``;
interface IContentID {
  id?: string;
}
const DetailComp: React.FC<IContentID> = ({id}) => {
  const movieMatch = useMatch("/movie/:id");
  const tvMatch = useMatch("/tv/:id");
  const searchMatch = useMatch("/search/:id");
  const naviagate = useNavigate();
  const backHome = () => {
    if (movieMatch) {
      naviagate("/");
    } else if (tvMatch) {
      naviagate("/tv");
    } else if (searchMatch) {
      naviagate("/search");
    } else {
      naviagate("/");
    }
  };

  return (
    <Overlay onClick={backHome}>
      <DetailCont>
        <DetailInfo>
          <DetailTitle>hihihii</DetailTitle>
          <OverView></OverView>
        </DetailInfo>
      </DetailCont>
    </Overlay>
  );
};
export default DetailComp;
