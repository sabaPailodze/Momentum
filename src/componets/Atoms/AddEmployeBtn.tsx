import { useState } from "react";
import EmployeeModal from "../Molecules/EmployeeModal";

const AddEmployeeBtn = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <div className="relative">
      <button
        className="border border-[#8338EC] hover:border-[#B588F4] cursor-pointer rounded-md px-5 py-2.5 text-lg font-normal"
        onClick={handleOpen}
      >
        თანამშრომლის შექმნა
      </button>

      {isOpen && <EmployeeModal handleClose={handleClose} />}
    </div>
  );
};

export default AddEmployeeBtn;
