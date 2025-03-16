import { useState, useEffect } from "react";
import { fetchData } from "../../services/axios";
import FilterBtns from "../Atoms/FilterBtns";
import { StateProps } from "../../types/PropTypes";
import { ErrorState } from "../../types/PropTypes";

const FiltersCont = () => {
  const [openFilter, setOpenFilter] = useState<string | null>(null);
  const [departments, setDepartments] = useState<StateProps[]>([]);
  const [priorities, setPriorities] = useState<StateProps[]>([]);
  const [employees, setEmployees] = useState<StateProps[]>([]);
  const [errors, setErrors] = useState<ErrorState>({});

  useEffect(() => {
    const loadData = async () => {
      try {
        const [depData, priData, empData] = await Promise.all([
          fetchData("departmensts"),
          fetchData("priorities"),
          fetchData("employees", true),
        ]);

        depData
          ? setDepartments(depData)
          : setErrors((prev) => ({
              ...prev,
              departments: "დეპარტამენტები ვერ მოიძებნა.",
            }));

        priData
          ? setPriorities(priData)
          : setErrors((prev) => ({
              ...prev,
              priorities: "პრიორიტეტები ვერ მოიძებნა.",
            }));

        empData
          ? setEmployees(empData)
          : setErrors((prev) => ({
              ...prev,
              employees: "თანამშრომლები ვერ მოიძებნა.",
            }));
      } catch (error) {
        console.error("მონაცემების ჩატვირთვის შეცდომა:", error);
        setErrors({
          departments: "მონაცემების ჩატვირთვისას მოხდა შეცდომა.",
          priorities: "მონაცემების ჩატვირთვისას მოხდა შეცდომა.",
          employees: "მონაცემების ჩატვირთვისას მოხდა შეცდომა.",
        });
      }
    };

    loadData();
  }, []);

  const getFilterData = () => {
    if (openFilter === "დეპარტამენტი") return departments;
    if (openFilter === "პრიორიტეტი") return priorities;
    if (openFilter === "თანამშრომელი") return employees;
    return [];
  };

  const getErrorMessage = () => {
    if (openFilter === "დეპარტამენტი") return errors.departments;
    if (openFilter === "პრიორიტეტი") return errors.priorities;
    if (openFilter === "თანამშრომელი") return errors.employees;
    return null;
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
          {getErrorMessage() ? (
            <div className="text-black text-center text-[20px] ">
              {getErrorMessage()}
            </div>
          ) : (
            <>
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
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default FiltersCont;
