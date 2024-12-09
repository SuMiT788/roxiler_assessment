import { useEffect, useState } from "react";

import { useMonth } from "../context/MonthContext";
import { fetchStatistics } from "../http";

export default function Statistics() {
  const { month } = useMonth();
  const [statistics, setStatistics] = useState({});

  useEffect(() => {
    async function fetchStatisticsData() {
      const response = await fetchStatistics(month);

      setStatistics((prev) => ({
        ...prev,
        ...response.result,
      }));
    }

    fetchStatisticsData();
  }, [month]);

  return (
    <div className="sales-summary">
      <div className="sales-item">
        <span className="label">Total Sale:</span>
        <span className="value">₹{statistics.totalSale}</span>
      </div>
      <div className="sales-item">
        <span className="label">Total Sold Item(s):</span>
        <span className="value">{statistics.totalSold}</span>
      </div>
      <div className="sales-item">
        <span className="label">Total Not Sold Item(s):</span>
        <span className="value">{statistics.totalNotSold}</span>
      </div>
    </div>
  );
}
