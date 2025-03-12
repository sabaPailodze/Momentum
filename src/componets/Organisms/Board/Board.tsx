import { Link } from "react-router-dom";
import FiltersCont from "../../Molecules/FiltersCont";

const Board = () => {
  return (
    <div className="flex flex-col pt-10 gap-20">
      <div>
        <FiltersCont />
      </div>
      <div>
        <Link to="/task/1" className="text-blue-500 underline">
          Go to Task 1
        </Link>
      </div>

      {/* ეს ლინკები შემდგომ იქნება ბექიდან წამოსულ ქარდებში რომელსაც მაპით 
      გადავუვლი და იქ თითოეულს ექნება ეს ლინკი რომელიც გადაივანს აიდით */}
    </div>
  );
};

export default Board;
