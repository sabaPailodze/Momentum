import TextInput from "../Atoms/TextInput";
import DropdownSelect from "../Atoms/DropdownSelect";
import { TaskFormProps } from "../../types/types";

const TaskForm = ({
  formData,
  setFormData,
  errors,
  isSubmitted,
  openDropdown,
  setOpenDropdown,
  handleAddTask,
}: TaskFormProps) => {
  return (
    <div className="w-[81%] h-full flex flex-col justify-between">
      <div className="flex gap-40 select-none">
        <div className="flex flex-col gap-14 flex-1">
          <TextInput
            label="სათაური"
            value={formData.title}
            setValue={(value) =>
              setFormData((prev) => ({ ...prev, title: value }))
            }
            error={errors.title || "სათაური აუცილებელია!"}
            asTextarea={false}
            showError={isSubmitted}
          />
          <TextInput
            label="აღწერა"
            value={formData.description}
            setValue={(value) =>
              setFormData((prev) => ({ ...prev, description: value }))
            }
            error={errors.description || "აღწერა აუცილებელია!"}
            asTextarea={true}
            showError={isSubmitted}
          />
          <div className="flex gap-8">
            <div className="flex flex-col gap-1.5 flex-1">
              <DropdownSelect
                id="priority"
                title="პრიორიტეტი*"
                endpoint="priorities"
                hasIcon={true}
                onSelect={(selected) =>
                  setFormData((prev) => ({ ...prev, priority: selected }))
                }
                isOpen={openDropdown === "priority"}
                setOpen={setOpenDropdown}
                error={
                  isSubmitted && !formData.priority
                    ? "პრიორიტეტი აუცილებელია!"
                    : ""
                }
              />
            </div>
            <div className="flex flex-col gap-1.5 flex-1">
              <DropdownSelect
                id="status"
                title="სტატუსი*"
                endpoint="statuses"
                onSelect={(selected) =>
                  setFormData((prev) => ({ ...prev, status: selected }))
                }
                isOpen={openDropdown === "status"}
                setOpen={setOpenDropdown}
                error={
                  isSubmitted && !formData.status ? "სტატუსი აუცილებელია!" : ""
                }
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-14 flex-1 justify-between">
          <DropdownSelect
            id="department"
            title="დეპარტამენტი*"
            endpoint="departments"
            onSelect={(selected) =>
              setFormData((prev) => ({ ...prev, department: selected }))
            }
            isOpen={openDropdown === "department"}
            setOpen={setOpenDropdown}
            error={
              isSubmitted && !formData.department
                ? "დეპარტამენტი აუცილებელია!"
                : ""
            }
          />
          <div className="flex flex-col pb-10">
            <DropdownSelect
              id="employee"
              title="პასუხისმგებელი თანამშრომელი*"
              endpoint="employees"
              onSelect={(selected) =>
                setFormData((prev) => ({ ...prev, assignee: selected }))
              }
              isOpen={openDropdown === "employee"}
              setOpen={setOpenDropdown}
              error={
                isSubmitted && !formData.assignee
                  ? "თანამშრომელი აუცილებელია!"
                  : ""
              }
            />
          </div>
          <div className="flex flex-col">
            <label className="text-[16px] font-bold text-[#343a40] pb-[6px]">
              დედლაინი*
            </label>
            <input
              type="date"
              value={formData.deadline}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  deadline: e.target.value,
                }))
              }
              className={`border w-[50%] cursor-pointer border-[#dee2e6] text-[14px] text-[#0d0f10] font-light p-3.5 rounded-[5px] ${
                isSubmitted && !formData.deadline ? "border-red-500" : ""
              }`}
            />
            {isSubmitted && (errors.deadline || !formData.deadline) && (
              <span className="text-red-500 text-[12px] mt-1">
                {errors.deadline || "დედლაინი აუცილებელია!"}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="w-full flex justify-end">
        <button
          onClick={handleAddTask}
          className="bg-[#8338ec] cursor-pointer duration-100 hover:bg-[#B588F4] rounded-[5px] text-white px-5 py-2.5 text-[18px]"
        >
          დავალების შექმნა
        </button>
      </div>
    </div>
  );
};

export default TaskForm;
