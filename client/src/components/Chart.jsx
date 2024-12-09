import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { useMonth } from "../context/MonthContext";
import { fetchItemsPerPriceRange } from "../http";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Chart() {
  const { month } = useMonth();
  const [items, setItems] = useState({});

  useEffect(() => {
    async function fetchItemsData() {
      const response = await fetchItemsPerPriceRange(month);

      setItems((prev) => ({
        ...prev,
        ...response.result,
      }));
    }

    fetchItemsData();
  }, [month]);

  const data = {
    labels: Object.keys(items),
    datasets: [
      {
        label: "Items",
        data: Object.values(items),
        backgroundColor: "rgba(75, 192, 192, 0.8)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Items per price range",
      },
    },
  };

  return (
    <div style={{ width: "80%", height: "600px", margin: "auto" }}>
      <Bar data={data} options={options} />
    </div>
  );
}
