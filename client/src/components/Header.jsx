import PropTypes from "prop-types";

import { useMonth } from "../context/MonthContext";

export default function Header({ onMenuChange, selectedMenu }) {
  const { month, setMonth } = useMonth();

  const onMonthChange = (value) => {
    setMonth(value);
  };

  function handleMenuChange(menuName) {
    onMenuChange(menuName);
  }

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const menuItemCssString = "menu-item";

  return (
    <header className="header w-screen">
      <div className="header-left">
        <a
          onClick={() => {
            handleMenuChange("dashboard");
          }}
        >
          <span className="site-name">InsightHub</span>
        </a>
        <nav className="menu">
          <a
            className={
              selectedMenu === "dashboard"
                ? menuItemCssString + " text-cyan-400"
                : menuItemCssString + " hover:text-cyan-400"
            }
            onClick={() => {
              handleMenuChange("dashboard");
            }}
          >
            Dashboard
          </a>
          <a
            className={
              selectedMenu === "statistics"
                ? menuItemCssString + " text-cyan-400"
                : menuItemCssString + " hover:text-cyan-400"
            }
            onClick={() => {
              handleMenuChange("statistics");
            }}
          >
            Statistics
          </a>
          <a
            className={
              selectedMenu === "chart"
                ? menuItemCssString + " text-cyan-400"
                : menuItemCssString + " hover:text-cyan-400"
            }
            onClick={() => {
              handleMenuChange("chart");
            }}
          >
            Chart
          </a>
        </nav>
      </div>
      <div className="header-right">
        <select
          className="month-dropdown"
          value={month}
          onChange={(e) => onMonthChange(e.target.value)}
        >
          {months.map((month, index) => (
            <option key={index} value={index + 1}>
              {month}
            </option>
          ))}
        </select>
      </div>
    </header>
  );
}

Header.propTypes = {
  onMenuChange: PropTypes.func.isRequired,
  selectedMenu: PropTypes.string.isRequired,
};
