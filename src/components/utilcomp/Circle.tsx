import {motion} from "framer-motion";
import styled from "styled-components";

const CircleSpan = styled(motion.span)`
  display: block;
  border-radius: 100%;
  margin: 0 auto;
  width: 10px;
  height: 10px;
  background-color: red;
`;
interface ICircle {
  id: string;
}
const Circle: React.FC<ICircle> = ({id}) => <CircleSpan layoutId={id} />;
export default Circle;
