import { Outlet } from "react-router-dom";
import NavBar from "../componets/Organisms/NavBar/NavBar";
import { EmployeeProvider } from "../context/EmployeeContext";

const Dashboard = () => {
  return (
    <EmployeeProvider>
      <div className="w-full h-screen px-30">
        <NavBar />
        <Outlet />
      </div>
    </EmployeeProvider>
  );
};

export default Dashboard;
