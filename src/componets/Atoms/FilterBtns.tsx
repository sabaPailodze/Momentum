import arrow from "../../assets/Images/arrow.svg";
import purpleArrow from "../../assets/Images/activeArrow.svg";
import { FilterBtnsProps } from "../../types/types";

const FilterBtns = ({ title, isOpen, setOpenFilter }: FilterBtnsProps) => {
  return (
    <div
      className="flex gap-2 px-[18px] py-2.5 cursor-pointer select-none"
      onClick={() => setOpenFilter(isOpen ? null : title)}
    >
      <div className={`${isOpen ? "text-[#8338EC]" : ""}`}>{title}</div>
      <img src={isOpen ? purpleArrow : arrow} alt="arrow" />
    </div>
  );
};

export default FilterBtns;
