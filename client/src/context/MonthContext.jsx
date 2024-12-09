import { createContext, useState, useContext } from "react";
import PropTypes from "prop-types";

// Create Context
const MonthContext = createContext();

// Provider Component
export const MonthProvider = ({ children }) => {
  const [month, setMonth] = useState(3);

  return (
    <MonthContext.Provider value={{ month, setMonth }}>
      {children}
    </MonthContext.Provider>
  );
};

MonthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Hook for ease of use
export const useMonth = () => useContext(MonthContext);
