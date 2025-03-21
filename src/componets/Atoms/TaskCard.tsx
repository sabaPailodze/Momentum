import { Link } from "react-router-dom";
import { TaskCardProps } from "../../types/types";
import CommentsIcon from "../../assets/Images/Comments.svg";

const getRandomColor = () => {
  const colors = ["#FF66A8", "#FFD86D", "#FB5607", "#89B6FF"];
  return colors[Math.floor(Math.random() * colors.length)];
};

const formatGeorgianDate = (date: string) => {
  const d = new Date(date);
  return d.toLocaleDateString("ka-GE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

const TaskCard = ({ task, color }: TaskCardProps) => {
  return (
    <Link to={`/task/${task.id}`} className="block w-full">
      <div
        style={{ borderColor: color }}
        className="border p-[20px] rounded-[15px] bg-white flex flex-col gap-[29px] w-full"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[10px]">
            <div
              className={`border p-[4px] ${
                task.priority.name === "დაბალი"
                  ? "border-[#08a508] text-[#08a508]"
                  : task.priority.name === "საშუალო"
                  ? "border-[#ffbe0b] text-[#ffbe0b]"
                  : "border-[#fa4d4d] text-[#fa4d4d]"
              } flex items-center gap-[4px] rounded-[4px]`}
            >
              <img src={task.priority.icon} alt="priority icon" />
              <span className="text-[12px] font-[500]">
                {task.priority.name}
              </span>
            </div>
            <div
              style={{ background: getRandomColor() }}
              className="py-[5px] rounded-[15px] px-[9px] text-white text-[12px] truncate"
            >
              {task.department.name.slice(0, 17)}
            </div>
          </div>
          <h4 className="text-[12px] text-[#212529]">
            {formatGeorgianDate(task.due_date)}
          </h4>
        </div>
        <div className="flex flex-col gap-3">
          <h2 className="text-[#000000] font-bold truncate text-[15px]">
            {task.name}
          </h2>
          <p className="text-[#343a40] text-[14px] break-words ]">
            {task.description}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <img
            className="w-[31px] h-[31px] rounded-[50%]"
            src={task.employee.avatar}
            alt="employee avatar"
          />
          <div className="flex items-center gap-[5px]">
            <img src={CommentsIcon} alt="comments icon" />
            <span>{task.total_comments}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TaskCard;
