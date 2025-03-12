import { useParams } from "react-router-dom";

const TaskDetails = () => {
  const { id } = useParams(); // URL-დან ამოიღებს Task ID-ს

  return (
    <div>
      <h1 className="text-2xl font-bold">Task Details</h1>
      <p>Task ID: {id}</p>
    </div>
  );
};

export default TaskDetails;
