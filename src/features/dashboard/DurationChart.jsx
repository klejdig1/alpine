import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import Heading from "../../ui/Heading.jsx";
import { useDarkMode } from "../../context/DarkModeContext.jsx";

const ChartBox = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 2.4rem 3.2rem;
  grid-column: 3 / span 2;

  @media (max-width: 1200px) {
    grid-column: 1 / -1;
  }

  @media (max-width: 768px) {
    padding: 2rem 1.6rem;
  }

  @media (max-width: 480px) {
    padding: 1.6rem 1.2rem;
  }

  & > *:first-child {
    margin-bottom: 1.6rem;
  }

  & .recharts-pie-label-text {
    font-weight: 600;
  }

  /* Prevent legend labels like '4-5 nights' from wrapping into two lines */
  & .recharts-legend-item {
    white-space: nowrap !important;
    display: inline-flex !important;
    align-items: center !important;
    margin: 0.2rem 0.5rem !important;
  }

  & .recharts-legend-item-text {
    margin-left: 0.4rem !important;
    font-size: 1.25rem !important;
    color: var(--color-grey-600) !important;
  }

  & .recharts-default-legend {
    display: flex !important;
    flex-wrap: wrap !important;
    justify-content: center !important;
  }
`;

const EmptyNotice = styled.p`
  text-align: center;
  font-size: 1.4rem;
  color: var(--color-grey-400);
  padding: 4rem 0;
`;

const startDataLight = [
  { duration: "1 night", value: 0, color: "#ef4444" },
  { duration: "2 nights", value: 0, color: "#f97316" },
  { duration: "3 nights", value: 0, color: "#eab308" },
  { duration: "4-5 nights", value: 0, color: "#84cc16" },
  { duration: "6-7 nights", value: 0, color: "#22c55e" },
  { duration: "8-14 nights", value: 0, color: "#14b8a6" },
  { duration: "15-21 nights", value: 0, color: "#3b82f6" },
  { duration: "21+ nights", value: 0, color: "#a855f7" },
];

const startDataDark = [
  { duration: "1 night", value: 0, color: "#b91c1c" },
  { duration: "2 nights", value: 0, color: "#c2410c" },
  { duration: "3 nights", value: 0, color: "#a16207" },
  { duration: "4-5 nights", value: 0, color: "#4d7c0f" },
  { duration: "6-7 nights", value: 0, color: "#15803d" },
  { duration: "8-14 nights", value: 0, color: "#0f766e" },
  { duration: "15-21 nights", value: 0, color: "#1d4ed8" },
  { duration: "21+ nights", value: 0, color: "#7e22ce" },
];

function prepareData(startData, stays = []) {
  function incArrayValue(arr, field) {
    return arr.map((obj) =>
      obj.duration === field ? { ...obj, value: obj.value + 1 } : obj
    );
  }

  const data = (stays || [])
    .reduce((arr, cur) => {
      const num = cur.numNights;
      if (num === 1) return incArrayValue(arr, "1 night");
      if (num === 2) return incArrayValue(arr, "2 nights");
      if (num === 3) return incArrayValue(arr, "3 nights");
      if ([4, 5].includes(num)) return incArrayValue(arr, "4-5 nights");
      if ([6, 7].includes(num)) return incArrayValue(arr, "6-7 nights");
      if (num >= 8 && num <= 14) return incArrayValue(arr, "8-14 nights");
      if (num >= 15 && num <= 21) return incArrayValue(arr, "15-21 nights");
      if (num >= 21) return incArrayValue(arr, "21+ nights");
      return arr;
    }, startData)
    .filter((obj) => obj.value > 0);

  return data;
}

function DurationChart({ confirmStays }) {
  const { isDarkMode } = useDarkMode();
  const boxRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(600);

  useEffect(() => {
    if (!boxRef.current) return;

    const updateWidth = () => {
      if (boxRef.current) {
        setContainerWidth(boxRef.current.clientWidth);
      }
    };
    updateWidth();

    if (window.ResizeObserver) {
      const observer = new ResizeObserver((entries) => {
        if (entries[0]?.contentRect) {
          setContainerWidth(entries[0].contentRect.width);
        }
      });
      observer.observe(boxRef.current);
      return () => observer.disconnect();
    } else {
      window.addEventListener("resize", updateWidth);
      return () => window.removeEventListener("resize", updateWidth);
    }
  }, []);

  const startData = isDarkMode ? startDataDark : startDataLight;
  const data = prepareData(startData, confirmStays);

  // If container width is narrower than 500px, use stacked layout (donut centered, legend underneath)
  // This completely eliminates clipping on mobile and prevents legend text wrapping.
  const isCompact = containerWidth < 500;

  return (
    <ChartBox ref={boxRef}>
      <Heading as="h2">Stay duration summary</Heading>

      {data.length === 0 ? (
        <EmptyNotice>No stay duration records available</EmptyNotice>
      ) : (
        <ResponsiveContainer width="100%" height={isCompact ? 290 : 240}>
          <PieChart>
            <Pie
              data={data}
              nameKey="duration"
              dataKey="value"
              innerRadius={isCompact ? 50 : 66}
              outerRadius={isCompact ? 74 : 90}
              cx={isCompact ? "50%" : "36%"}
              cy={isCompact ? "40%" : "50%"}
              paddingAngle={3}
            >
              {data.map((entry) => (
                <Cell key={entry.duration} fill={entry.color} stroke={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend
              verticalAlign={isCompact ? "bottom" : "middle"}
              align={isCompact ? "center" : "right"}
              width={isCompact ? "100%" : "44%"}
              layout={isCompact ? "horizontal" : "vertical"}
              iconSize={13}
              iconType="circle"
              wrapperStyle={{
                paddingTop: isCompact ? "10px" : "0",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      )}
    </ChartBox>
  );
}

export default DurationChart;
