// import { useState, useEffect } from "react";
// import { fetchDepartments } from "../../services/axios";
// import FilterBtns from "../Atoms/FilterBtns";

// const FiltersCont = () => {
//   const [openFilter, setOpenFilter] = useState<string | null>(null);
//   const [departments, setDepartments] = useState<
//     { id: number; name: string }[]
//   >([]);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const getDeparments = async () => {
//       const data = await fetchDepartments();
//       if (data) {
//         setDepartments(data);
//       } else {
//         setError("დეპარტამენტების ჩატვირთვისას შეცდომა მოხდა.");
//       }
//     };
//     getDeparments();
//   }, []);

//   return (
//     <div className="flex flex-col w-[55%] gap-13 relative transition-all duration-400">
//       <div className="text-[34px] font-semibold">დავალებების გვერდი</div>
//       <div className="flex gap-[45px] border-1 border-[#DEE2E6] rounded-[5px]">
//         <FilterBtns
//           title="დეპარტამენტი"
//           isOpen={openFilter === "დეპარტამენტი"}
//           setOpenFilter={setOpenFilter}
//         />
//         <FilterBtns
//           title="პრიორიტეტი"
//           isOpen={openFilter === "პრიორიტეტი"}
//           setOpenFilter={setOpenFilter}
//         />
//         <FilterBtns
//           title="თანამშრომელი"
//           isOpen={openFilter === "თანამშრომელი"}
//           setOpenFilter={setOpenFilter}
//         />
//       </div>
//       {openFilter && (
//         <div className="flex z-50 bg-white absolute top-40 w-full flex-col gap-[25px] border-1 border-[#8338EC] rounded-[10px] px-[30px] py-5">
//           <div className="pt-5 h-[17vh] overflow-y-scroll flex flex-col gap-[22px]">
//             {departments.map((department) => (
//               // <li key={department.id}>{department.name}</li>
//               <label
//                 key={department.id}
//                 className="flex items-center gap-2 text-[#212529] font-[16px] font-normal"
//               >
//                 <input type="checkbox" value={department.name} />
//                 {department.name}
//               </label>
//             ))}
//           </div>
//           <div className="flex justify-end">
//             <button className="rounded-[20px] cursor-pointer text-white bg-[#8338EC] text-[16px] font-normal px-5 py-2 leading-normal">
//               არჩევა
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FiltersCont;

import { useState, useEffect } from "react";
import { fetchData } from "../../services/axios";
import FilterBtns from "../Atoms/FilterBtns";

const FiltersCont = () => {
  const [openFilter, setOpenFilter] = useState<string | null>(null);
  const [departments, setDepartments] = useState<
    { id: number; name: string }[]
  >([]);
  const [priorities, setPriorities] = useState<{ id: number; name: string }[]>(
    []
  );
  const [employees, setEmployees] = useState<{ id: number; name: string }[]>(
    []
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      const [depData, priData, empData] = await Promise.all([
        fetchData("departments"),
        fetchData("priorities"),
        fetchData("employees", true),
      ]);

      depData
        ? setDepartments(depData)
        : setError("დეპარტამენტები ვერ მოიძებნა.");
      priData ? setPriorities(priData) : setError("პრიორიტეტები ვერ მოიძებნა.");
      empData ? setEmployees(empData) : setError("თანამშრომლები ვერ მოიძებნა.");
    };

    loadData();
  }, []);

  const getFilterData = () => {
    if (openFilter === "დეპარტამენტი") return departments;
    if (openFilter === "პრიორიტეტი") return priorities;
    if (openFilter === "თანამშრომელი") return employees;
    return [];
  };

  return (
    <div className="flex flex-col w-[55%] gap-13 relative transition-all duration-400">
      <div className="text-[34px] font-semibold">დავალებების გვერდი</div>
      <div className="flex gap-[45px] border border-[#DEE2E6] rounded-[5px]">
        {["დეპარტამენტი", "პრიორიტეტი", "თანამშრომელი"].map((title) => (
          <FilterBtns
            key={title}
            title={title}
            isOpen={openFilter === title}
            setOpenFilter={setOpenFilter}
          />
        ))}
      </div>

      {openFilter && (
        <div className="flex z-50 bg-white absolute top-40 w-full flex-col gap-5 border border-[#8338EC] rounded-[10px] px-6 py-5 shadow-lg">
          <div className="pt-5 h-[17vh] overflow-y-scroll flex flex-col gap-2">
            {getFilterData().map((item) => (
              <label
                key={item.id}
                className="flex items-center gap-2 text-[#212529] font-normal text-[16px]"
              >
                <input type="checkbox" value={item.name} />
                {item.name}
              </label>
            ))}
          </div>
          <div className="flex justify-end">
            <button className="rounded-[20px] text-white bg-[#8338EC] text-[16px] font-normal px-5 py-2">
              არჩევა
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FiltersCont;
