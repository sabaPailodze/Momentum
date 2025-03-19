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
    const maxSizeInBytes = 600 * 1024;
    const newErrors = {
      name: name ? validateField(name) : "სახელი აუცილებელია!",
      surname: surname ? validateField(surname) : "გვარი აუცილებელია!",
      avatar: (() => {
        if (!avatar) return "გთხოვთ ატვირთოთ ავატარი";
        if (avatar.size > maxSizeInBytes)
          return "აუცილებელია ფოტო იყოს 600 KB-ზე ნაკლები ზომის";
        return "";
      })(),
      department: selectedDep ? "" : "გთხოვთ მიუთითოთ დეპარტამენტი",
    };

    setErrorsForm(newErrors);

    if (
      !newErrors.name &&
      !newErrors.surname &&
      !newErrors.avatar &&
      !newErrors.department
    ) {
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
