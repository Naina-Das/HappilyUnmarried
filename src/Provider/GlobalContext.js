import React, { createContext, useState } from "react";
export const GlobalContext = createContext();
// This context provider is passed to any component requiring the context
export const GlobalProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(3);
  const [category, setCategory] = useState({});
  const [categories, setCategories] = useState([])
  return (
    <GlobalContext.Provider
      value={{
        data,
        setData,
        limit,
        setLimit,
        category,
        setCategory,
        categories,
        setCategories
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};