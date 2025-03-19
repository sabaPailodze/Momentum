export interface FilterBtnsProps {
  title: string;
  isOpen: boolean;
  setOpenFilter: (title: string | null) => void;
}

export interface StateProps {
  id: number;
  name: string;
  surname?: string;
  avatar?: string;
}

export interface ErrorState {
  departments?: string;
  priorities?: string;
  employees?: string;
}

export type DepDropDownProps = {
  isDepOpen: boolean;
  departments: { id: number; name: string }[];
  handleDepSelect: (dep: string) => void;
  errors: { departments?: string };
};

export type EmployeeModalProps = {
  handleClose: () => void;
  onEmployeeAdded?: (employee: StateProps) => void;
};

export interface EmployeeFormProps {
  name: string;
  surname: string;
  avatar: File | null;
  selectedDep: string | null;
  departments: { id: number; name: string }[];
  setErrorsForm: React.Dispatch<
    React.SetStateAction<{
      name: string;
      surname: string;
      avatar: string;
      department: string;
    }>
  >;
  onEmployeeAdded?: (employee: {
    id: number;
    name: string;
    surname: string;
    avatar?: string;
  }) => void;
  handleClose: () => void;
}
