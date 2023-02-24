import { createContext, useContext, useReducer } from "react";
import { dataReducer } from "./dataReducer";

const DataContext = createContext();

export const StateProvider = ({ children }) => {
  const [data, dataDispatch] = useReducer(dataReducer, {
    // clients: [],
    // orders: [],
    // drivers: [],
    // trucks: [],
    // trips: [],
    // truckOwners: [],
  });
  return (
    <DataContext.Provider value={{ data, dataDispatch }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  return useContext(DataContext);
};
