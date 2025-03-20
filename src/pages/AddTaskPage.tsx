import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTask } from "../services/axios";
import { useTaskValidation } from "../hooks/useTaskValidation";
import { TaskFormData } from "../types/types";
import TaskForm from "../componets/Molecules/AddTaskForm";

const AddTask = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<TaskFormData>({
    title: "",
    description: "",
    priority: null,
    status: null,
    department: null,
    assignee: null,
    deadline: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const errors = useTaskValidation(formData, isSubmitted);

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      priority: null,
      status: null,
      department: null,
      assignee: null,
      deadline: "",
    });
    setIsSubmitted(false);
  };

  const handleAddTask = async () => {
    setIsSubmitted(true);

    if (Object.keys(errors).length > 0) {
      console.log("Validation failed:", { ...formData, errors });
      return;
    }

    const newTask = {
      name: formData.title,
      description: formData.description,
      due_date: new Date(formData.deadline).toISOString().split("T")[0],
      status_id: formData.status!.id,
      priority_id: formData.priority!.id,
      department_id: formData.department!.id,
      employee_id: formData.assignee!.id,
    };

    try {
      const response = await createTask(newTask);
      console.log("Task Created:", response);
      resetForm();
      navigate("/");
    } catch (error) {
      console.error("Error adding task:", error);
      alert("დავალების დამატება ვერ მოხერხდა!");
    }
  };

  return (
    <div className="py-10 flex flex-col gap-[30px]">
      <h1 className="text-[34px] text-[#212529] font-semibold">
        შექმენი ახალი დავალება
      </h1>
      <div className="h-[804px] w-full border-[0.3px] py-17 px-14 border-[#DDD2FF] bg-[#FBF9FFA6] rounded-[4px] flex flex-col">
        <TaskForm
          formData={formData}
          setFormData={setFormData}
          errors={errors}
          isSubmitted={isSubmitted}
          openDropdown={openDropdown}
          setOpenDropdown={setOpenDropdown}
          handleAddTask={handleAddTask}
        />
      </div>
    </div>
  );
};

export default AddTask;
