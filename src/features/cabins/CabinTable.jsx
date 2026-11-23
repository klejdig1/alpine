import Spinner from "../../ui/Spinner.jsx";
import CabinRow from "./CabinRow.jsx";
import { useCabins } from "./useCabins.js";
import Table from "../../ui/Table.jsx";
import Menus from "../../ui/Menus.jsx";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty.jsx";

function CabinTable() {
  const { isLoading, cabins } = useCabins();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;
  if (!cabins?.length) return <Empty resourceName="cabins" />;

  // 1. Filter by discount
  const filterValue = searchParams.get("discount") || "all";
  let filterCabins = cabins;

  if (filterValue === "no-discount") {
    filterCabins = cabins.filter((cabin) => !cabin.discount);
  }
  if (filterValue === "with-discount") {
    filterCabins = cabins.filter((cabin) => cabin.discount > 0);
  }

  // 2. Filter by search query
  const search = searchParams.get("search")?.toLowerCase().trim();
  if (search) {
    filterCabins = filterCabins.filter(
      (c) =>
        c.name.toLowerCase().includes(search) ||
        c.description.toLowerCase().includes(search)
    );
  }

  // 3. Sort
  const sortBy = searchParams.get("sortBy") || "name-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;

  const sortCabins = [...filterCabins].sort((a, b) => {
    if (typeof a[field] === "string") {
      return a[field].localeCompare(b[field]) * modifier;
    }
    return (a[field] - b[field]) * modifier;
  });

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header role="row">
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
