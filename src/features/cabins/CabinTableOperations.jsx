import TableOperations from "../../ui/TableOperations.jsx";
import Filter from "../../ui/Filter.jsx";
import SortBy from "../../ui/SortBy.jsx";
import SearchInput from "../../ui/SearchInput.jsx";
import Button from "../../ui/Button.jsx";
import { HiArrowDownTray } from "react-icons/hi2";
import { exportToCSV } from "../../utils/exportToCSV.js";
import { useCabins } from "./useCabins.js";

function CabinTableOperations() {
  const { cabins } = useCabins();

  function handleExport() {
    if (!cabins?.length) return;
    const formatted = cabins.map((c) => ({
      CabinName: c.name,
      Capacity: c.maxCapacity,
      RegularPrice: c.regularPrice,
      Discount: c.discount,
      Description: c.description,
    }));
    exportToCSV(formatted, "alpine-haven-cabins.csv");
  }

  return (
    <TableOperations>
      <SearchInput placeholder="Search cabin name..." />

      <Filter
        filterField="discount"
        options={[
          { value: "all", label: "All" },
          { value: "no-discount", label: "No discount" },
          { value: "with-discount", label: "With discount" },
        ]}
      />

      <SortBy
        options={[
          { value: "name-asc", label: "Sort by name (A-Z)" },
          { value: "name-desc", label: "Sort by name (Z-A)" },
          { value: "regularPrice-asc", label: "Sort by price (low first)" },
          { value: "regularPrice-desc", label: "Sort by price (high first)" },
          { value: "maxCapacity-asc", label: "Sort by capacity (low first)" },
          { value: "maxCapacity-desc", label: "Sort by capacity (high first)" },
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

export default CabinTableOperations;
