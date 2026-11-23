import styled from "styled-components";

const StyledStat = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 1.6rem;
  display: grid;
  grid-template-columns: 6.4rem 1fr;
  grid-template-rows: auto auto auto;
  column-gap: 1.6rem;
  row-gap: 0.4rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }
`;

const Icon = styled.div`
  grid-row: 1 / span 2;
  aspect-ratio: 1;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-${(props) => props.color}-100);

  & svg {
    width: 3.2rem;
    height: 3.2rem;
    color: var(--color-${(props) => props.color}-700);
  }
`;

const Title = styled.h5`
  align-self: end;
  font-size: 1.2rem;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-500);
`;

const Value = styled.p`
  font-size: 2.4rem;
  line-height: 1;
  font-weight: 600;
`;

const ProgressContainer = styled.div`
  grid-column: 1 / -1;
  width: 100%;
  height: 5px;
  background-color: var(--color-grey-100);
  border-radius: 9999px;
  overflow: hidden;
  margin-top: 0.6rem;
`;

const ProgressFill = styled.div`
  height: 100%;
  width: ${(props) => Math.min(100, Math.max(0, props.$percent))}%;
  background-color: var(--color-${(props) => props.color}-700);
  border-radius: 9999px;
  transition: width 0.6s ease;
`;

function Stat({ icon, title, value, color, progress }) {
  return (
    <StyledStat>
      <Icon color={color}>{icon}</Icon>
      <Title>{title}</Title>
      <Value>{value}</Value>
      {progress !== undefined && (
        <ProgressContainer>
          <ProgressFill color={color} $percent={progress} />
        </ProgressContainer>
      )}
    </StyledStat>
  );
}

export default Stat;
