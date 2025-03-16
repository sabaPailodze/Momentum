// import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import FiltersCont from "../../Molecules/FiltersCont";
import Statuses from "../../Atoms/Statuses";
import { fetchData } from "../../../services/axios";

const Board = () => {
  const [statusesData, setStatusesData] = useState<[]>([]);
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchData("statuses");
        setStatusesData(data);
        console.log(data);
      } catch (error) {
        console.error("სტატუსები ვერ მოიძებნა", error);
      }
    };
    loadData();
  }, []);

  return (
    <div className="flex flex-col pt-10 gap-20">
      <div>
        <FiltersCont />
      </div>
      <div className="flex flex-col">
        <div className="flex w-full">
          <Statuses title={statusesData} />
        </div>
        {/* <div>
          <Link to="/task/1" className="text-blue-500 underline">
            Go to Task 1
          </Link>
        </div> */}
      </div>

      {/* ეს ლინკები შემდგომ იქნება ბექიდან წამოსულ ქარდებში რომელსაც მაპით 
      გადავუვლი და იქ თითოეულს ექნება ეს ლინკი რომელიც გადაივანს აიდით */}
    </div>
  );
};

export default Board;
