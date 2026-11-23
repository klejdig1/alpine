import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header.jsx";
import Sidebar from "./Sidebar.jsx";
import styled from "styled-components";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
`;

const SidebarContainer = styled.div`
  grid-row: 1 / -1;

  @media (max-width: 960px) {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    z-index: 100;
    transform: ${(props) => (props.$isOpen ? "translateX(0)" : "translateX(-100%)")};
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: ${(props) => (props.$isOpen ? "var(--shadow-lg)" : "none")};
  }
`;

const MobileOverlay = styled.div`
  display: none;

  @media (max-width: 960px) {
    display: ${(props) => (props.$isOpen ? "block" : "none")};
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: var(--backdrop-color);
    backdrop-filter: blur(3px);
    z-index: 90;
  }
`;

const Main = styled.main`
  background-color: var(--color-grey-100);
  padding: 3.2rem 4rem 6.4rem;
  overflow-y: auto;

  @media (max-width: 768px) {
    padding: 2rem 1.6rem 4rem;
  }
`;

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

function AppLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <StyledAppLayout>
      <Header onToggleSidebar={() => setIsSidebarOpen((s) => !s)} />

      <MobileOverlay
        $isOpen={isSidebarOpen}
        onClick={() => setIsSidebarOpen(false)}
      />

      <SidebarContainer $isOpen={isSidebarOpen}>
        <Sidebar onCloseSidebar={() => setIsSidebarOpen(false)} />
      </SidebarContainer>

      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;
