import styled from "styled-components";
import HeaderMenu from "./HeaderMenu.jsx";
import UserAvatar from "../features/authentication/UserAvatar.jsx";
import { HiBars3 } from "react-icons/hi2";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 3.2rem;
  border-bottom: 1px solid var(--color-grey-100);
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 2rem;

  @media (max-width: 960px) {
    padding: 1.2rem 1.6rem;
    justify-content: space-between;
  }
`;

const MenuToggle = styled.button`
  display: none;
  background: none;
  border: none;
  padding: 0.6rem;
  border-radius: var(--border-radius-sm);
  color: var(--color-grey-600);
  cursor: pointer;
  align-items: center;
  justify-content: center;

  & svg {
    width: 2.6rem;
    height: 2.6rem;
  }

  @media (max-width: 960px) {
    display: flex;
  }

  &:hover {
    background-color: var(--color-grey-100);
    color: var(--color-grey-800);
  }
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
`;

function Header({ onToggleSidebar }) {
  return (
    <StyledHeader>
      <MenuToggle onClick={onToggleSidebar} title="Open navigation">
        <HiBars3 />
      </MenuToggle>
      <HeaderRight>
        <UserAvatar />
        <HeaderMenu />
      </HeaderRight>
    </StyledHeader>
  );
}

export default Header;
