import styled from "styled-components";
import DashboardBox from "./DashboardBox.jsx";
import Heading from "../../ui/Heading.jsx";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useDarkMode } from "../../context/DarkModeContext.jsx";
import { formatCurrency } from "../../utils/helpers.js";

const StyledChartBox = styled(DashboardBox)`
  grid-column: 1 / -1;

  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

function CabinRevenueChart({ cabins = [], bookings = [] }) {
  const { isDarkMode } = useDarkMode();

  const data = cabins.map((cabin) => {
    const cabinBookings = bookings.filter(
      (b) => b.cabinId === cabin.id || b.cabins?.name === cabin.name
    );
    const revenue = cabinBookings.reduce((sum, b) => sum + (b.totalPrice || 0), 0);
    const bookingsCount = cabinBookings.length;

    return {
      cabin: cabin.name ? `${cabin.name}` : "Cabin",
      revenue,
      bookingsCount,
    };
  });

  return (
    <StyledChartBox>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1.6rem",
          flexWrap: "wrap",
          gap: "0.8rem",
        }}
      >
        <Heading as="h3">Revenue by Cabin Unit</Heading>
        <span style={{ fontSize: "1.2rem", color: "var(--color-grey-500)" }}>
          Chalet sales & occupancy yield
        </span>
      </div>

      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="cabin"
            tick={{ fill: isDarkMode ? "#e5e7eb" : "#4b5563", fontSize: 11 }}
            tickLine={{ stroke: isDarkMode ? "#e5e7eb" : "#4b5563" }}
            interval={0}
          />
          <YAxis
            unit="$"
            tick={{ fill: isDarkMode ? "#e5e7eb" : "#4b5563", fontSize: 11 }}
            tickLine={{ stroke: isDarkMode ? "#e5e7eb" : "#4b5563" }}
            width={50}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: isDarkMode ? "#18212f" : "#fff",
              borderRadius: "8px",
              border: "1px solid var(--color-grey-200)",
            }}
            formatter={(val) => [formatCurrency(val), "Revenue"]}
          />
          <Bar dataKey="revenue" fill="var(--color-brand-600)" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </StyledChartBox>
  );
}

export default CabinRevenueChart;
