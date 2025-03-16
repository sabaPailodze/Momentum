// import arrow from "../../assets/Images/arrow.svg";
// import purpleArrow from "../../assets/Images/activeArrow.svg";

// interface FilterBtnsProps {
//   title: string;
//   isOpen: boolean;
//   setOpenFilter: (title: string | null) => void;
// }

// const FilterBtns = ({ title, isOpen, setOpenFilter }: FilterBtnsProps) => {
//   const toggleDropDown = () => {
//     setOpenFilter(isOpen ? null : title);
//   };

//   return (
//     <div
//       className="flex gap-2 px-[18px] py-2.5 cursor-pointer"
//       onClick={toggleDropDown}
//     >
//       <div className={`${isOpen ? "text-[#8338EC]" : ""}`}>{title}</div>
//       {isOpen ? <img src={purpleArrow} alt="" /> : <img src={arrow} alt="" />}
//     </div>
//   );
// };

// export default FilterBtns;

import arrow from "../../assets/Images/arrow.svg";
import purpleArrow from "../../assets/Images/activeArrow.svg";
import { FilterBtnsProps } from "../../types/PropTypes";

const FilterBtns = ({ title, isOpen, setOpenFilter }: FilterBtnsProps) => {
  return (
    <div
      className="flex gap-2 px-[18px] py-2.5 cursor-pointer"
      onClick={() => setOpenFilter(isOpen ? null : title)}
    >
      <div className={`${isOpen ? "text-[#8338EC]" : ""}`}>{title}</div>
      <img src={isOpen ? purpleArrow : arrow} alt="arrow" />
    </div>
  );
};

export default FilterBtns;
