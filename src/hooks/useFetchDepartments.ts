import { useEffect, useState } from "react";
import { fetchData } from "../services/axios";
import { StateProps, ErrorState } from "../types/types";

export const useFetchDepartments = () => {
  const [departments, setDepartments] = useState<StateProps[]>([]);
  const [errors, setErrors] = useState<ErrorState>({});

  useEffect(() => {
    const loadData = async () => {
      try {
        const depData = await fetchData("departments");
        depData
          ? setDepartments(depData)
          : setErrors({ departments: "დეპარტამენტები ვერ მოიძებნა!" });
      } catch (error) {
        setErrors({ departments: "დეპარტამენტები ვერ მოიძებნა!" });
      }
    };
    loadData();
  }, []);

  return { departments, errors };
};
