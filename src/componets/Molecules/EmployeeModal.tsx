import { useState, useEffect } from "react";
import cancleBtn from "../../assets/Images/Cancel.svg";
import arrow from "../../assets/Images/arrow.svg";
import DepDropDown from "../Atoms/DepDropDown";
import { useFetchDepartments } from "../../hooks/useFetchDepartments";
import { EmployeeModalProps } from "../../types/types";
import TextInput from "../Atoms/TextInput";
import { validateField } from "../../utils/validateField";
import useHandleSubmit from "../../hooks/useHandleSubmit";

const EmployeeModal = ({
  handleClose,
  onEmployeeAdded,
}: EmployeeModalProps) => {
  const { departments, errors } = useFetchDepartments();
  const [selectedDep, setSelectedDep] = useState<string | null>(null);
  const [isDepOpen, setIsDepOpen] = useState(false);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [errorsForm, setErrorsForm] = useState({
    name: "",
    surname: "",
    avatar: "",
    department: "",
  });

  useEffect(() => {
    if (name)
      setErrorsForm((prev) => ({ ...prev, name: validateField(name, "name") }));
  }, [name]);

  useEffect(() => {
    if (surname)
      setErrorsForm((prev) => ({
        ...prev,
        surname: validateField(surname, "surname"),
      }));
  }, [surname]);

  useEffect(() => {
    if (selectedDep) setErrorsForm((prev) => ({ ...prev, department: "" }));
  }, [selectedDep]);

  const handleDepSelect = (dep: string) => {
    setSelectedDep(dep);
    setIsDepOpen(false);
    setErrorsForm((prev) => ({ ...prev, department: "" }));
  };

  const { handleSubmit } = useHandleSubmit({
    name,
    surname,
    avatar,
    selectedDep,
    departments,
    setErrorsForm,
    onEmployeeAdded,
    handleClose,
  });

  return (
    <div
      className="fixed inset-0 bg-black/20 flex items-center justify-center backdrop-blur-sm z-50"
      onClick={handleClose}
    >
      <div
        className="w-full max-w-[913px] h-full max-h-[766px] bg-white pt-10 pb-15 px-10 rounded-[10px] shadow-xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-2 w-full h-full flex justify-between flex-col gap-11">
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
            <div className="flex flex-col w-full flex-1 relative">
              <TextInput
                label="სახელი"
                value={name}
                setValue={setName}
                error={errorsForm.name}
              />
            </div>
            <div className="flex flex-col w-full flex-1 relative">
              <TextInput
                label="გვარი"
                value={surname}
                setValue={setSurname}
                error={errorsForm.surname}
              />
            </div>
          </div>
          <div className="relative">
            <h2 className="font-bold pb-1">ავატარი*</h2>
            <input
              type="file"
              onChange={(e) => {
                const newFile = e.target.files?.[0] || null;
                setAvatar(newFile);
                if (newFile) {
                  setErrorsForm((prev) => ({ ...prev, avatar: "" }));
                }
              }}
              className="p-10 border border-dashed w-full text-[#6c757d]"
            />

            {errorsForm.avatar && (
              <span className="absolute top-[135px]  left-0 text-red-500 text-[12px]">
                {errorsForm.avatar}
              </span>
            )}
          </div>
          <div className="w-[47%] relative">
            <h2 className="font-bold pb-1">დეპარტამენტი</h2>
            <div
              className={`border w-full h-[50px] border-[#ced4da] flex items-center justify-between px-4 rounded-[6px] cursor-pointer `}
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
            {errorsForm.department && (
              <span className="absolute top-[80px] left-0 text-red-500 text-[12px]">
                {errorsForm.department}
              </span>
            )}
            <DepDropDown
              isDepOpen={isDepOpen}
              departments={departments}
              errors={errors}
              handleDepSelect={handleDepSelect}
            />
          </div>
          <div className="justify-end flex gap-5 pt-7 select-none">
            <button
              className="border-1 p-2 rounded-[8px] border-[#8338EC] hover:border-[#B588F4] text-16px text-black cursor-pointer"
              onClick={handleClose}
            >
              გაუქმება
            </button>
            <button
              className="text-[18px] p-2 rounded-[8px] bg-[#8338EC] duration-100 hover:bg-[#B588F4] text-white cursor-pointer"
              onClick={handleSubmit}
            >
              დაამატე თანამშრომელი
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeModal;
