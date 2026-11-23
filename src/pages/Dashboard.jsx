import styled from "styled-components";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import DashboardLayout from "../features/dashboard/DashboardLayout.jsx";
import DashboardFilter from "../features/dashboard/DashboardFilter.jsx";
import { format } from "date-fns";

const HeaderGroup = styled.div`
  display: flex;
  align-items: baseline;
  gap: 1.6rem;
  flex-wrap: wrap;
`;

const StatusBadge = styled.span`
  font-size: 1.2rem;
  font-weight: 500;
  color: var(--color-green-700);
  background-color: var(--color-green-100);
  padding: 0.4rem 1.2rem;
  border-radius: 9999px;
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;

  &::before {
    content: "";
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: var(--color-green-700);
    display: inline-block;
  }
`;

function Dashboard() {
  const todayFormatted = format(new Date(), "EEEE, MMM dd, yyyy");

  return (
    <>
      <Row type="horizontal">
        <HeaderGroup>
          <Heading as="h1">Dashboard</Heading>
          <StatusBadge>
            {todayFormatted} • Live Operations
          </StatusBadge>
        </HeaderGroup>
        <DashboardFilter />
      </Row>

      <DashboardLayout />
    </>
  );
}

export default Dashboard;
