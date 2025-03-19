import Check from "../../assets/Images/check.svg";

interface TextInputProps {
  label: string;
  value: string;
  setValue: (v: string) => void;
  error: string;
}

const TextInput = ({ label, value, setValue, error }: TextInputProps) => {
  const minLength = 2;
  const maxLength = 255;
  const isEmpty = value.length === 0;

  return (
    <div className="flex flex-col flex-1 relative">
      <p className="font-bold">{label}*</p>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={`border p-2.5 rounded-[6px] border-[#ced4da] ${
          isEmpty ? "text-gray-400" : "text-black"
        }`}
      />
      {error && isEmpty && (
        <span className=" text-red-500 text-[12px]">{error}</span>
      )}

      <div className="flex flex-col gap-[2px] mt-[6px]">
        <span
          className={`flex gap-1 text-[10px] ${
            isEmpty
              ? "text-gray-400"
              : value.length >= minLength
              ? "text-green-500"
              : "text-red-500"
          }`}
        >
          <img src={Check} alt="check svg" />
          <p>მინიმუმ {minLength} სიმბოლო</p>
        </span>
        <span
          className={`flex gap-1 text-[10px] ${
            isEmpty
              ? "text-gray-400"
              : value.length <= maxLength
              ? "text-green-500"
              : "text-red-500"
          }`}
        >
          <img src={Check} alt="check svg" />
          <p>მაქსიმუმ {maxLength} სიმბოლო</p>
        </span>
      </div>
    </div>
  );
};

export default TextInput;
