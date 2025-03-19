export const validateField = (value: string, field: "name" | "surname") => {
  if (value.trim() === "") return "გთხოვთ შეავსოთ ველი";
  if (value.length < 2) return "მინიმუმ 2 სიმბოლო";
  if (value.length > 255) return "მაქსიმუმ 255 სიმბოლო";
  return "";
};
