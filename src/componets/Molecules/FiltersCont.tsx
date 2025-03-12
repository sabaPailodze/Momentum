import FilterBtns from "../Atoms/FilterBtns";

const FiltersCont = () => {
  return (
    <div className="flex flex-col gap-13">
      <div className="text-[34px] font-semibold">დავალებების გვერდი</div>
      <div className="flex gap-[45px] border-1 border-[#DEE2E6] rounded-[5px] w-auto">
        <FilterBtns title={"დეპარტამენტი"} />
        <FilterBtns title={"პრიორიტეტი"} />
        <FilterBtns title={"თანამშრომელი"} />
      </div>
    </div>
  );
};

export default FiltersCont;
