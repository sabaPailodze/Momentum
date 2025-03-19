import { StatusesProps } from "../../types/types";

const Statuses = ({ title }: StatusesProps) => {
  const colors = ["#F7BC30", "#4f4a47", "#FF006E", "#3A86FF"];
  return (
    <div className="flex gap-13 flex-1">
      {title.map((statuses, index) => (
        <span
          className="text-[20px] rounded-[10px] cursor-pointer text-white py-[15px] px-4 flex-1 text-center"
          style={{ backgroundColor: colors[index] }}
          key={statuses.id}
        >
          {statuses.name}
        </span>
      ))}
    </div>
  );
};

export default Statuses;
