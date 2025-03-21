import { useEffect, useState } from "react";
import FiltersCont from "../../Molecules/FiltersCont";
import TaskColumn from "../../Molecules/TaskColumn";
import { fetchData } from "../../../services/axios";
import { useEmployeeContext } from "../../../context/EmployeeContext";
import { StateProps, TaskProps } from "../../../types/types";

const Board = () => {
  const [statusesData, setStatusesData] = useState<StateProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { tasks, setTasks, refreshTasks } = useEmployeeContext();

  const colors = ["#F7BC30", "#FB5607", "#FF006E", "#3A86FF"];

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [statuses, tasksData] = await Promise.all([
          fetchData("statuses"),
          fetchData("tasks"),
        ]);

        console.log("Statuses:", statuses);
        console.log("Tasks from API:", tasksData);

        setStatusesData(statuses);

        const enrichedTasks: TaskProps[] = tasksData.map((task: any) => ({
          id: task.id,
          name: task.name,
          description: task.description,
          due_date: task.due_date,
          status: task.status,
          priority: task.priority,
          department: task.department,
          employee: task.employee,
          total_comments: task.total_comments || 0,
        }));

        console.log("Enriched Tasks:", enrichedTasks);
        setTasks(enrichedTasks);
      } catch (error) {
        console.error("მონაცემები ვერ მოიძებნა", error);
        setError("მონაცემების ჩატვირთვა ვერ მოხერხდა");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [refreshTasks, setTasks]);

  console.log("Current Tasks in Context:", tasks);

  if (loading)
    return <p className="text-center text-[#6C757D] pt-16">იტვირთება...</p>;
  if (error) return <p className="text-center text-red-500 pt-16">{error}</p>;

  return (
    <div className="flex flex-col pt-16 gap-20 min-h-screen">
      <div>
        <FiltersCont />
      </div>
      <div className="flex flex-col flex-1">
        <div className="flex gap-13 justify-between">
          {statusesData.map((status, index) => (
            <TaskColumn
              key={status.id}
              status={status}
              tasks={tasks}
              color={colors[index % colors.length]}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Board;
