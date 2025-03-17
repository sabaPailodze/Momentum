import { useState } from "react";
import cancleBtn from "../../assets/Images/Cancel.svg";
import Check from "../../assets/Images/check.svg";
import arrow from "../../assets/Images/arrow.svg";
import DepDropDown from "./DepDropDown";
import { useFetchDepartments } from "../../hooks/useFetchDepartments";

type EmployeeModalProps = {
  handleClose: () => void;
};

const EmployeeModal = ({ handleClose }: EmployeeModalProps) => {
  const { departments, errors } = useFetchDepartments();
  const [selectedDep, setSelectedDep] = useState<string | null>(null);
  const [isDepOpen, setIsDepOpen] = useState(false);

  const handleDepSelect = (dep: string) => {
    setSelectedDep(dep);
    setIsDepOpen(false);
  };

  return (
    <div
      className="fixed inset-0 bg-black/20 flex items-center justify-center backdrop-blur-sm z-50"
      onClick={handleClose}
    >
      <div
        className="w-full max-w-[913px] h-full max-h-[766px] bg-white pt-10 pb-15 px-10 rounded-[10px] shadow-xl relative "
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-2  w-full h-full flex flex-col gap-11">
          <button
            className="absolute top-4 right-4 text-white py-5 px-7 rounded cursor-pointer"
            onClick={handleClose}
          >
            <img src={cancleBtn} alt="cancel button" />
          </button>
          <h2 className="text-[32px] text-center font-semibold pt-18">
            თანამშრომლის დამატება
          </h2>
          <div className="flex w-full gap-11">
            <div className="flex flex-col flex-1">
              <p className="font-bold">სახელი*</p>
              <input
                type="text"
                className="border border-[#ced4da] p-2.5 rounded-[6px]"
              />
              <span className="flex gap-1 pt-[6px] text-[12px] text-[#6c757d]">
                <img src={Check} alt="check svg" />
                <p>მინიმუმ 2 სიმბოლო</p>
              </span>
              <span className="flex gap-1 text-[12px] text-[#6c757d]">
                <img src={Check} alt="check svg" />
                <p>მინიმუმ 255 სიმბოლო</p>
              </span>
            </div>
            <div className=" flex flex-col flex-1">
              <p className="font-bold">გვარი*</p>
              <input
                type="text"
                className="border border-[#ced4da] p-2.5 rounded-[6px]"
              />
              <span className="flex gap-1 pt-[6px] text-[12px] text-[#6c757d]">
                <img src={Check} alt="check svg" />
                <p>მინიმუმ 2 სიმბოლო</p>
              </span>
              <span className="flex gap-1 text-[12px] text-[#6c757d]">
                <img src={Check} alt="check svg" />
                <p>მინიმუმ 255 სიმბოლო</p>
              </span>
            </div>
          </div>
          <div>
            <h2 className="font-bold pb-1">ავატარი</h2>
            <input
              type="file"
              className="p-10 border border-dashed w-full text-[#ced4da]"
            />
          </div>
          <div className="w-[47%] relative ">
            <h2 className=" font-bold pb-1">დეპარტამენტი</h2>
            <div
              className="border w-full border-[#ced4da]  h-[50px]  flex items-center justify-between px-4 rounded-[6px] cursor-pointer"
              onClick={() => setIsDepOpen(!isDepOpen)}
            >
              <span className="text-black text-[14px]">
                {selectedDep || ""}
              </span>
              <img
                src={arrow}
                alt="arrow"
                className={`transition-transform select-none ${
                  isDepOpen ? "rotate-180" : ""
                }`}
              />
            </div>
            <DepDropDown
              isDepOpen={isDepOpen}
              departments={departments}
              errors={errors}
              handleDepSelect={handleDepSelect}
            />
          </div>
          <div className="justify-end flex gap-5 pt-7 select-none">
            <button
              className="border-1 p-2 rounded-[8px] border-[#8338EC] hover:border-[#B588F4] text-16px text-black  cursor-pointer"
              onClick={handleClose}
            >
              გაუქმება
            </button>
            <button className="text-[18px] p-2 rounded-[8px] bg-[#8338EC] duration-100 hover:bg-[#B588F4] text-white cursor-pointer">
              დაამატე თანამშრომელი
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeModal;
