import EmployeeIcon from "../../assets/Images/EmployeeIcon.svg";
import CalendarIcon from "../../assets/Images/CalendarIcon.svg";
import DateIcon from "../../assets/Images/DateIcon.svg";
import arrow from "../../assets/Images/arrow.svg";
import { GeorgianDate } from "../../utils/GeorgianDate";
import { TaskDescriptionProps } from "../../types/types";
import { getRandomColor } from "../../utils/RandomColor";

const TaskDescription = ({
  task,
  statuses,
  isStatusDropdownOpen,
  setIsStatusDropdownOpen,
  handleStatusChange,
}: TaskDescriptionProps) => {
  return (
    <div className="flex flex-col gap-16 flex-1">
      <div className="flex flex-col gap-3">
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
            <span className="text-[12px] font-[500]">{task.priority.name}</span>
          </div>
          <div
            style={{ background: getRandomColor() }}
            className="py-[5px] rounded-[15px] px-[9px] text-white text-[12px] truncate"
          >
            {task.department.name.slice(0, 17)}
          </div>
        </div>
        <div className="flex gap-6 flex-col">
          <h2 className="text-[34px] font-semibold text-black">{task.name}</h2>
          <p>{task.description}</p>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <p className="text-[24px] text-black font-bold">დავალების დეტალები</p>
        <div className="flex flex-col gap-7">
          <div className="flex items-center gap-33">
            <div className="flex items-center gap-3">
              <img src={DateIcon} alt="status icon" className="w-5 h-5" />
              <h3 className="text-[16px] text-[#474747]">სტატუსი</h3>
            </div>
            <div className="relative w-64">
              <div
                className="flex items-center justify-between p-2 border border-gray-300 select-none rounded-[6px] bg-white text-[#0d0f10a2] font-light cursor-pointer"
                onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
              >
                <span className="text-[#474747] text-[14px] font-light">
                  {task.status.name}
                </span>
                <img src={arrow} alt="arrow" className="w-4 h-4" />
              </div>
              {isStatusDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-20">
                  {statuses.map((status) => (
                    <div
                      key={status.id}
                      onClick={() => handleStatusChange(status.id, status.name)}
                      className="p-3 text-[14px] text-[#474747]  hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      {status.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-16">
            <div className="flex items-center gap-3">
              <img src={EmployeeIcon} alt="user icon" className="w-5 h-5" />
              <h3 className="text-[16px] text-[#474747]">თანამშრომელი</h3>
            </div>
            <div className="flex items-center gap-4 cursor-pointer">
              <img
                className="w-10 h-10 rounded-full object-cover"
                src={task.employee.avatar}
                alt="employee avatar"
              />
              <div className="flex flex-col gap-1">
                <p className="text-[11px] text-[#474747]">
                  {task.department.name}
                </p>
                <p className="text-[14px] text-black font-semibold">
                  {task.employee.name} {task.employee.surname}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-16">
            <div className="flex items-center gap-3">
              <img src={CalendarIcon} alt="calendar icon" className="w-5 h-5" />
              <h3 className="text-[16px] text-[#474747]">დავალების ვადა</h3>
            </div>
            <p className="text-[14px] text-[#0d0f10]">
              {GeorgianDate(task.due_date)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDescription;
