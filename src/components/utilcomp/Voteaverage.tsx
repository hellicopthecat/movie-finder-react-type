import styled from "styled-components";

const VoteSpan = styled.span`
  margin-bottom: 20px;
`;
interface IVoteAverate {
  score: number;
}
const Voteaverage: React.FC<IVoteAverate> = ({score}) => {
  return <VoteSpan>⭐️ {score.toFixed(2)} / 10</VoteSpan>;
};
export default Voteaverage;
