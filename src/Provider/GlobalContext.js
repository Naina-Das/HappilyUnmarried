import React, { createContext, useState } from "react";
export const GlobalContext = createContext();
// This context provider is passed to any component requiring the context
export const GlobalProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(3);
  return (
    <GlobalContext.Provider
      value={{
        data,
        setData,
        limit,
        setLimit
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};