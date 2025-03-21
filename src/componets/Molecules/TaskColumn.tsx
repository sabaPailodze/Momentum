import TaskCard from "../Atoms/TaskCard";
import { TaskColumnProps } from "../../types/types";

const TaskColumn = ({ status, tasks, color }: TaskColumnProps) => {
  const filteredTasks = tasks.filter((task) => task.status.id === status.id);

  console.log(
    `Tasks for status ${status.name} (ID: ${status.id}):`,
    filteredTasks
  );

  return (
    <div className="flex flex-col gap-[30px] w-[380px] min-w-[300px]">
      <div
        style={{ backgroundColor: color }}
        className="rounded-[10px] py-[15px] w-full"
      >
        <h2 className="text-[20px] font-[500] cursor-pointer text-center text-white">
          {status.name}
        </h2>
      </div>
      {filteredTasks.length > 0 &&
        filteredTasks.map((task) => (
          <TaskCard key={task.id} task={task} color={color} />
        ))}
    </div>
  );
};

export default TaskColumn;
