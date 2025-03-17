import { DepDropDownProps } from "../../types/types";

const DepDropDown = ({
  isDepOpen,
  departments,
  handleDepSelect,
  errors,
}: DepDropDownProps) => {
  if (!isDepOpen) return null;

  return (
    <div className="absolute mt-1 w-full border border-[#ced4da] rounded-[6px] bg-white shadow-md max-h-30 select-none overflow-y-scroll z-10">
      {departments.length > 0 ? (
        departments.map((item) => (
          <div
            key={item.id}
            className="p-2 cursor-pointer hover:bg-gray-100 text-[#0d0f10] font-light text-[14px]"
            onClick={() => handleDepSelect(item.name)}
          >
            {item.name}
          </div>
        ))
      ) : (
        <div className="p-2 text-red-500">{errors.departments}</div>
      )}
    </div>
  );
};

export default DepDropDown;
