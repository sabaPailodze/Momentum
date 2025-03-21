import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { fetchData } from "../services/axios";
import { TaskProps, StateProps } from "../types/types";
import CommentsSection from "../componets/Molecules/CommentsSection";
import TaskDescription from "../componets/Molecules/TaskDescription";

const TaskDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [task, setTask] = useState<TaskProps | null>(null);
  const [statuses, setStatuses] = useState<StateProps[]>([]);
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [taskData, statusesData] = await Promise.all([
          fetchData(`tasks/${id}`),
          fetchData("statuses"),
        ]);

        const enrichedTask: TaskProps = {
          id: taskData.id,
          name: taskData.name,
          description: taskData.description,
          due_date: taskData.due_date,
          status: taskData.status,
          priority: taskData.priority,
          department: taskData.department,
          employee: taskData.employee,
          total_comments: taskData.total_comments || 0,
        };

        setTask(enrichedTask);
        setStatuses(statusesData);
      } catch (err) {
        setError("დავალების ჩატვირთვა ვერ მოხერხდა");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [id]);

  const handleStatusChange = (statusId: number, statusName: string) => {
    if (task) {
      setTask({
        ...task,
        status: { id: statusId, name: statusName },
      });
      setIsStatusDropdownOpen(false);
    }
  };

  const updateTotalComments = useCallback(
    (taskId: number, newTotal: number) => {
      setTask((prev) => {
        if (prev && prev.id === taskId && prev.total_comments !== newTotal) {
          return {
            ...prev,
            total_comments: newTotal,
          };
        }
        return prev;
      });
    },
    []
  );

  if (loading)
    return <p className="text-center text-gray-500 pt-16">იტვირთება...</p>;
  if (error) return <p className="text-center text-red-500 pt-16">{error}</p>;
  if (!task)
    return (
      <p className="text-center text-gray-500 pt-16">დავალება ვერ მოიძებნა</p>
    );

  return (
    <div className="pt-10 flex flex-col gap-3 h-full">
      <div className="flex w-full justify-between gap-55">
        <TaskDescription
          task={task}
          statuses={statuses}
          isStatusDropdownOpen={isStatusDropdownOpen}
          setIsStatusDropdownOpen={setIsStatusDropdownOpen}
          handleStatusChange={handleStatusChange}
        />
        <div className="flex-1">
          <CommentsSection
            taskId={task.id}
            totalComments={task.total_comments}
            updateTotalComments={updateTotalComments}
          />
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
