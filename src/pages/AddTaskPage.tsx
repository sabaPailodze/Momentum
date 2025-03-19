import { useState } from "react";
import DropdownSelect from "../componets/Atoms/DropdownSelect";
import TextInput from "../componets/Atoms/TextInput";
import { createTask } from "../services/axios";

const AddTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");
  const [department, setDepartment] = useState("");
  const [assignee, setAssignee] = useState("");
  const [deadline, setDeadline] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const handleAddTask = async () => {
    setIsSubmitted(true);

    if (
      !title ||
      !description ||
      !priority ||
      !status ||
      !department ||
      !assignee ||
      !deadline ||
      title.length < 2 ||
      title.length > 255 ||
      description.length < 2 ||
      description.length > 255
    ) {
      return;
    }

    const newTask = {
      title,
      description,
      priority,
      status,
      department,
      assignee,
      deadline,
    };

    try {
      const response = await createTask(newTask);
      alert("დავალება წარმატებით დაემატა!");
      console.log("Task Created:", response);

      setTitle("");
      setDescription("");
      setPriority("");
      setStatus("");
      setDepartment("");
      setAssignee("");
      setDeadline("");
      setIsSubmitted(false);
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
        <div className="w-[81%] h-full flex flex-col justify-between">
          <div className="flex gap-40 select-none">
            <div className="flex flex-col gap-14 flex-1">
              <TextInput
                label="სათაური"
                value={title}
                setValue={setTitle}
                error="სათაური აუცილებელია!"
                asTextarea={false}
                showError={isSubmitted}
              />
              <TextInput
                label="აღწერა"
                value={description}
                setValue={setDescription}
                error="აღწერა აუცილებელია!"
                asTextarea={true}
                showError={isSubmitted}
              />
              <div className="flex gap-8">
                <div className="flex flex-col gap-1.5 flex-1">
                  <DropdownSelect
                    id="priority"
                    title={"პრიორიტეტი*"}
                    endpoint={"priorities"}
                    hasIcon={true}
                    onSelect={(selected) => setPriority(selected)}
                    isOpen={openDropdown === "priority"}
                    setOpen={setOpenDropdown}
                    error={
                      isSubmitted && !priority ? "პრიორიტეტი აუცილებელია!" : ""
                    }
                  />
                </div>
                <div className="flex flex-col gap-1.5 flex-1">
                  <DropdownSelect
                    id="status"
                    title={"სტატუსი*"}
                    endpoint={"statuses"}
                    onSelect={(selected) => setStatus(selected)}
                    isOpen={openDropdown === "status"}
                    setOpen={setOpenDropdown}
                    error={isSubmitted && !status ? "სტატუსი აუცილებელია!" : ""}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-14 flex-1 justify-between">
              <DropdownSelect
                id="department"
                title={"დეპარტამენტი*"}
                endpoint={"departments"}
                onSelect={(selected) => setDepartment(selected)}
                isOpen={openDropdown === "department"}
                setOpen={setOpenDropdown}
                error={
                  isSubmitted && !department ? "დეპარტამენტი აუცილებელია!" : ""
                }
              />
              <div className="flex flex-col pb-10">
                <DropdownSelect
                  id="employee"
                  title={"პასუხისმგებელი თანამშრომელი*"}
                  endpoint={"employees"}
                  onSelect={(selected) => setAssignee(selected)}
                  isOpen={openDropdown === "employee"}
                  setOpen={setOpenDropdown}
                  error={
                    isSubmitted && !assignee ? "თანამშრომელი აუცილებელია!" : ""
                  }
                />
              </div>
              <div className="flex flex-col">
                <label className="text-[16px] font-bold text-[#343a40] pb-[6px]">
                  დედლაინი*
                </label>
                <input
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className={`border w-[50%] cursor-pointer border-[#dee2e6] text-[14px] text-[#0d0f10] font-light p-3.5 rounded-[5px] ${
                    isSubmitted && !deadline ? "border-red-500" : ""
                  }`}
                />
                {isSubmitted && !deadline && (
                  <span className="text-red-500 text-[12px] mt-1">
                    დედლაინი აუცილებელია!
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
      </div>
    </div>
  );
};

export default AddTask;
