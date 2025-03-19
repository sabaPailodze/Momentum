import { useState, useEffect } from "react";
import arrow from "../../assets/Images/arrow.svg";
import { fetchData } from "../../services/axios";
import { OptionType } from "../../types/types";
import { ExtendedDropdownSelectProps } from "../../types/types";

const DropdownSelect = ({
  id,
  title,
  endpoint,
  onSelect,
  isOpen,
  setOpen,
  hasIcon,
  error,
}: ExtendedDropdownSelectProps) => {
  const [options, setOptions] = useState<OptionType[]>([]);
  const [selectedOption, setSelectedOption] = useState<OptionType | null>();
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setErrorMessage(null);
      try {
        const data = await fetchData(endpoint, true);
        setOptions(data);
      } catch (err) {
        setErrorMessage("მონაცემების ჩატვირთვის შეცდომა");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [endpoint]);

  const handleToggle = () => {
    setOpen(isOpen ? null : id);
  };

  const handleSelect = (option: OptionType) => {
    setSelectedOption(option);
    const selectedValue = isEmployee
      ? `${option.name} ${option.surname || ""}`
      : option.name;
    onSelect(selectedValue);
    setOpen(null);
  };

  const isPriority = endpoint === "priorities";
  const isEmployee = endpoint === "employees";

  return (
    <div className="relative">
      <h2 className="font-bold pb-1">{title}</h2>
      <div
        className={`border w-full h-[50px] border-[#ced4da] flex items-center justify-between px-4 rounded-[6px] cursor-pointer ${
          error ? "border-red-500" : ""
        }`}
        onClick={handleToggle}
      >
        <div className="flex items-center">
          {isEmployee && selectedOption?.avatar && (
            <img
              src={selectedOption.avatar}
              alt={`${selectedOption.name} avatar`}
              className="mr-2 w-[30px] h-[30px] rounded-full"
            />
          )}
          {isPriority && hasIcon && selectedOption?.icon && (
            <img
              src={selectedOption.icon}
              alt={`${selectedOption.name} icon`}
              className="mr-2 w-5 h-5"
            />
          )}
          <span className="text-black text-[14px]">
            {selectedOption
              ? isEmployee
                ? `${selectedOption.name} ${selectedOption.surname || ""}`
                : selectedOption.name
              : ""}
          </span>
        </div>
        <img
          src={arrow}
          alt="arrow"
          className={`transition-transform select-none ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>
      {error && <span className="text-red-500 text-[12px] mt-1">{error}</span>}

      {isOpen && (
        <div className="absolute w-full bg-white shadow-md rounded mt-1 z-10">
          {loading ? (
            <p className="p-2 text-gray-500">იტვირთება...</p>
          ) : errorMessage ? (
            <p className="p-2 text-red-500">{errorMessage}</p>
          ) : options.length === 0 ? (
            <p className="p-2 text-gray-500">მონაცემები არ მოიძებნა</p>
          ) : (
            <ul className="max-h-40 overflow-y-auto">
              {options.map((option) => (
                <li
                  key={option.id}
                  className="p-2 hover:bg-gray-200 text-[14px] bg-[#FBF9FFA6] cursor-pointer flex items-center"
                  onClick={() => handleSelect(option)}
                >
                  {isPriority && hasIcon && option.icon && (
                    <img
                      src={option.icon}
                      alt={`${option.name} icon`}
                      className="mr-2 w-4 h-4.5"
                    />
                  )}
                  {isEmployee && option.avatar && (
                    <img
                      src={option.avatar}
                      alt={`${option.name} avatar`}
                      className="mr-2.5 w-[30px] h-[30px] rounded-full"
                    />
                  )}
                  {isEmployee
                    ? `${option.name} ${option.surname || ""}`
                    : option.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default DropdownSelect;
