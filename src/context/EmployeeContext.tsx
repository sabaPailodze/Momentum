import { createContext, useContext, useState, ReactNode } from "react";
import { StateProps, TaskProps } from "../types/types";

interface EmployeeContextType {
  employees: StateProps[];
  addEmployee: (employee: StateProps) => void;
  tasks: TaskProps[];
  setTasks: React.Dispatch<React.SetStateAction<TaskProps[]>>;
  refreshTasks: boolean;
  setRefreshTasks: React.Dispatch<React.SetStateAction<boolean>>;
}

const EmployeeContext = createContext<EmployeeContextType | undefined>(
  undefined
);

export const EmployeeProvider = ({ children }: { children: ReactNode }) => {
  const [employees, setEmployees] = useState<StateProps[]>([]);
  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const [refreshTasks, setRefreshTasks] = useState(false);

  const addEmployee = (employee: StateProps) => {
    setEmployees((prev) => [...prev, employee]);
  };

  return (
    <EmployeeContext.Provider
      value={{
        employees,
        addEmployee,
        tasks,
        setTasks,
        refreshTasks,
        setRefreshTasks,
      }}
    >
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
