import styled from "styled-components";
import Logo from "./Logo.jsx";
import MainNav from "./MainNav.jsx";
import DeveloperCredits from "./DeveloperCredits.jsx";
import { HiXMark } from "react-icons/hi2";

const StyledSidebar = styled.aside`
  background-color: var(--color-grey-0);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);
  grid-row: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  overflow-y: auto;
  position: relative;
  height: 100vh;
  width: 26rem;

  @media (max-width: 960px) {
    width: 28rem;
    padding: 2.4rem 2rem;
  }
`;

const CloseButton = styled.button`
  display: none;
  background: none;
  border: none;
  position: absolute;
  top: 1.6rem;
  right: 1.6rem;
  color: var(--color-grey-500);
  cursor: pointer;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);

  & svg {
    width: 2.4rem;
    height: 2.4rem;
  }

  @media (max-width: 960px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &:hover {
    background-color: var(--color-grey-100);
    color: var(--color-grey-800);
  }
`;

function Sidebar({ onCloseSidebar }) {
  return (
    <StyledSidebar>
      <CloseButton onClick={onCloseSidebar} title="Close navigation">
        <HiXMark />
      </CloseButton>
      <Logo />
      <MainNav onCloseSidebar={onCloseSidebar} />
      <DeveloperCredits />
    </StyledSidebar>
  );
}

export default Sidebar;
