import { useState, useEffect } from "react";
import { TaskFormData } from "../types/types";

export const useTaskValidation = (
  formData: TaskFormData,
  isSubmitted: boolean
) => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (!isSubmitted) return;

    const newErrors: { [key: string]: string } = {};

    if (!formData.title) newErrors.title = "სათაური აუცილებელია!";
    if (!formData.description) newErrors.description = "აღწერა აუცილებელია!";
    if (!formData.priority) newErrors.priority = "პრიორიტეტი აუცილებელია!";
    if (!formData.status) newErrors.status = "სტატუსი აუცილებელია!";
    if (!formData.department)
      newErrors.department = "დეპარტამენტი აუცილებელია!";
    if (!formData.assignee) newErrors.assignee = "თანამშრომელი აუცილებელია!";
    if (!formData.deadline) newErrors.deadline = "დედლაინი აუცილებელია!";
    if (formData.title.length < 2 || formData.title.length > 255)
      newErrors.title = "სათაური აუცილებელია!";
    if (formData.description.length < 2 || formData.description.length > 255)
      newErrors.description = "აღწერა აუცილებელია!";

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(formData.deadline);
    if (selectedDate < today) {
      newErrors.deadline = "გთხოვთ მიუთითოთ დღევანდელი ან მომავალი თარიღი!";
    }

    setErrors(newErrors);
  }, [formData, isSubmitted]);

  return errors;
};
