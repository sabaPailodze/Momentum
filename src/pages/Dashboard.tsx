import { Outlet } from "react-router-dom";
import NavBar from "../componets/Organisms/NavBar/NavBar";

const Dashboard = () => {
  return (
    <div className="w-full h-screen px-30">
      <NavBar />
      <Outlet />
    </div>
  );
};

export default Dashboard;
