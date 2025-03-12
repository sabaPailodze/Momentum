import arrow from "../../assets/Images/arrow.svg";
import purpleArrow from "../../assets/Images/activeArrow.svg";
import { useState } from "react";

interface TitleProps {
  title: string;
}
const FilterBtns = ({ title }: TitleProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleDropDown: () => void = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="flex gap-2 cursor-pointer" onClick={toggleDropDown}>
      <div>{title}</div>
      {isOpen ? <img src={purpleArrow} alt="" /> : <img src={arrow} alt="" />}
    </div>
  );
};

export default FilterBtns;
