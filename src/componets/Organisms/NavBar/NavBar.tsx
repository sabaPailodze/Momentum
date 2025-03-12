import { Link } from "react-router-dom";
import image from "../../../assets/Images/Hourglass.svg";
import AddTaskBtn from "../../Atoms/AddTaskBtn";
import AddEmployeBtn from "../../Atoms/AddEmployeBtn";

const NavBar = () => {
  return (
    <div className="flex py-[30px] justify-between">
      <div className="flex">
        <Link
          to="/"
          className="text-[#8338EC] text-[31px] font-medium font-fredoka"
        >
          Momentum
        </Link>
        <img src={image} alt="Logo" />
      </div>
      <div className="flex gap-10">
        <AddEmployeBtn />
        <Link to="/add-task" className="text-blue-500">
          <AddTaskBtn />
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
