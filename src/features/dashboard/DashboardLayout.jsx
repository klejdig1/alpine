import styled from "styled-components";
import useRecentBookings from "./useRecentBookings.js";
import Spinner from "../../ui/Spinner.jsx";
import Stats from "./Stats.jsx";
import { useCabins } from "../cabins/useCabins.js";
import SalesChart from "./SalesChart.jsx";
import DurationChart from "./DurationChart.jsx";
import CabinRevenueChart from "./CabinRevenueChart.jsx";
import { useRecentStays } from "./useRecentStays.js";
import TodayActivity from "../check-in-out/TodayActivity.jsx";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto auto auto auto;
  gap: 2.4rem;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr 1fr;
    gap: 1.8rem;
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 1.6rem;
  }
`;

function DashboardLayout() {
  const { bookings, isLoading1 } = useRecentBookings();
  const { isLoading: isLoading2, confirmStays, numDays } = useRecentStays();
  const { cabins, isLoading: isLoading3 } = useCabins();

  if (isLoading1 || isLoading2 || isLoading3) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmStays={confirmStays}
        numDays={numDays}
        cabinCount={cabins.length}
      />
      <TodayActivity />
      <DurationChart confirmStays={confirmStays} />
      <SalesChart bookings={bookings} numDays={numDays} />
      <CabinRevenueChart cabins={cabins} bookings={bookings} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
