import { createContext, useContext, useState, ReactNode } from "react";
import { StateProps } from "../types/types";
import { EmployeeContextType } from "../types/types";

const EmployeeContext = createContext<EmployeeContextType | undefined>(
  undefined
);

export const EmployeeProvider = ({ children }: { children: ReactNode }) => {
  const [employees, setEmployees] = useState<StateProps[]>([]);

  const addEmployee = (employee: StateProps) => {
    setEmployees((prev) => [...prev, employee]);
  };

  return (
    <EmployeeContext.Provider value={{ employees, addEmployee }}>
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployeeContext = () => {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error(
      "useEmployeeContext must be used within an EmployeeProvider"
    );
  }
  return context;
};
