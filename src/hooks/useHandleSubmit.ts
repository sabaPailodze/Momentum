import { addEmployee } from "../services/axios";
import { validateField } from "../utils/validateField";
import { EmployeeFormProps } from "../types/types";

const useHandleSubmit = ({
  name,
  surname,
  avatar,
  selectedDep,
  departments,
  setErrorsForm,
  onEmployeeAdded,
  handleClose,
}: EmployeeFormProps) => {
  const handleSubmit = async () => {
    const nameError = validateField(name, "name");
    const surnameError = validateField(surname, "surname");
    const avatarError = avatar === null ? "გთხოვთ ატვირთოთ ავატარი" : "";
    const departmentError = !selectedDep ? "გთხოვთ მიუთითოთ დეპარტამენტი" : "";

    setErrorsForm({
      name: nameError,
      surname: surnameError,
      avatar: avatarError,
      department: departmentError,
    });

    if (!nameError && !surnameError && !avatarError && !departmentError) {
      try {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("surname", surname);
        if (avatar) formData.append("avatar", avatar);
        formData.append(
          "department_id",
          departments.find((d) => d.name === selectedDep)?.id.toString() || ""
        );

        const newEmployee = await addEmployee(formData);
        console.log("API response:", newEmployee);

        if (onEmployeeAdded) {
          onEmployeeAdded({
            id: newEmployee.id,
            name: newEmployee.name,
            surname: newEmployee.surname,
            avatar: newEmployee.avatar || "",
          });
        }
        handleClose();
      } catch (error) {
        console.error("Error adding employee:", error);
        setErrorsForm((prev) => ({
          ...prev,
          avatar: "თანამშრომლის დამატება ვერ მოხერხდა",
        }));
      }
    }
  };

  return { handleSubmit };
};

export default useHandleSubmit;
