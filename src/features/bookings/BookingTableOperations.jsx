import SortBy from "../../ui/SortBy";
import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";
import SearchInput from "../../ui/SearchInput.jsx";
import Button from "../../ui/Button.jsx";
import { HiArrowDownTray } from "react-icons/hi2";
import { exportToCSV } from "../../utils/exportToCSV.js";
import { UseBookings } from "./useBookings.js";

function BookingTableOperations() {
  const { bookings } = UseBookings();

  function handleExport() {
    if (!bookings?.length) return;
    const formatted = bookings.map((b) => ({
      BookingID: b.id,
      GuestName: b.guests?.fullName,
      GuestEmail: b.guests?.email,
      Cabin: b.cabins?.name,
      StartDate: b.startDate,
      EndDate: b.endDate,
      Status: b.status,
      TotalPrice: b.totalPrice,
      IsPaid: b.isPaid,
    }));
    exportToCSV(formatted, "alpine-haven-bookings.csv");
  }

  return (
    <TableOperations>
      <SearchInput placeholder="Search guest, cabin..." />

      <Filter
        filterField="status"
        options={[
          { value: "all", label: "All" },
          { value: "checked-out", label: "Checked out" },
          { value: "checked-in", label: "Checked in" },
          { value: "unconfirmed", label: "Unconfirmed" },
        ]}
      />

      <SortBy
        options={[
          { value: "startDate-desc", label: "Sort by date (recent first)" },
          { value: "startDate-asc", label: "Sort by date (earlier first)" },
          { value: "totalPrice-desc", label: "Sort by amount (high first)" },
          { value: "totalPrice-asc", label: "Sort by amount (low first)" },
        ]}
      />

      <Button
        variation="secondary"
        size="small"
        onClick={handleExport}
        title="Export to CSV"
      >
        <HiArrowDownTray /> Export CSV
      </Button>
    </TableOperations>
  );
}

export default BookingTableOperations;
