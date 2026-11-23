import Stat from "./Stat.jsx";
import { HiOutlineBriefcase, HiOutlineChartBar } from "react-icons/hi";
import { HiOutlineBanknotes, HiOutlineCalendarDays } from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers.js";

function Stats({ bookings, confirmStays, numDays, cabinCount }) {
  const numBookings = bookings.length;
  const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);
  const checkIns = (confirmStays ?? []).length;

  const totalNights = (confirmStays ?? []).reduce((acc, cur) => acc + cur.numNights, 0);
  const totalAvailableNights = numDays * cabinCount || 1;
  const occupation = totalNights / totalAvailableNights;
  const occupationPercent = Math.min(100, Math.round(occupation * 100));

  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title="Check ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={checkIns}
      />
      <Stat
        title="Occupancy rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={occupationPercent + "%"}
        progress={occupationPercent}
      />
    </>
  );
}

export default Stats;
