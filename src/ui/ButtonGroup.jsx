import styled from "styled-components";

const ButtonGroup = styled.div`
  display: flex;
  gap: 1.2rem;
  justify-content: flex-end;
  flex-wrap: wrap;

  @media (max-width: 640px) {
    justify-content: stretch;
    & > * {
      flex: 1 1 auto;
      text-align: center;
    }
  }
`;

export default ButtonGroup;
