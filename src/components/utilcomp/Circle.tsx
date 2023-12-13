import {motion} from "framer-motion";
import styled from "styled-components";

const CircleSpan = styled(motion.span)`
  position: absolute;
  top: -15px;
  left: 0;
  right: 0;
  display: flex;
  border-radius: 100%;
  margin: 0 auto;
  width: 7px;
  height: 7px;
  background-color: red;
`;
interface ICircle {
  layoutId: string;
}
const Circle: React.FC<ICircle> = ({layoutId}) => (
  <CircleSpan layoutId={layoutId} />
);
export default Circle;
