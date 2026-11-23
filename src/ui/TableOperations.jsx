import styled from "styled-components";

const TableOperations = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
  justify-content: end;

  @media (max-width: 768px) {
    flex-wrap: wrap;
    justify-content: flex-start;
    gap: 0.8rem;
    width: 100%;
  }
`;

export default TableOperations;
