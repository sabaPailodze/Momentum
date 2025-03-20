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

export interface DropdownSelectProps {
  title: string;
  endpoint: string;
  hasIcon?: boolean;
  onSelect: (selectedItem: any) => void;
}

export type OptionType = {
  id: number;
  name: string;
  icon?: string;
  surname?: string;
  avatar?: string;
};

export interface Employee {
  id: number;
  name: string;
  surname?: string;
  avatar?: string;
}

export interface TextInputProps {
  label: string;
  value: string;
  setValue: (v: string) => void;
  error: string;
  asTextarea?: boolean;
  showError?: boolean;
}

export interface Status {
  id: number;
  name: string;
}

export interface StatusesProps {
  title: Status[];
}

export interface ExtendedDropdownSelectProps extends DropdownSelectProps {
  id: string;
  isOpen: boolean;
  setOpen: (id: string | null) => void;
  hasIcon?: boolean;
  error?: string;
}

export interface Option {
  id: number;
  name: string;
  icon?: string;
  surname?: string;
  avatar?: string;
  department_id?: number;
}

export interface TaskFormData {
  title: string;
  description: string;
  priority: Option | null;
  status: Option | null;
  department: Option | null;
  assignee: Option | null;
  deadline: string;
}
export interface TaskFormProps {
  formData: TaskFormData;
  setFormData: React.Dispatch<React.SetStateAction<TaskFormData>>;
  errors: { [key: string]: string };
  isSubmitted: boolean;
  openDropdown: string | null;
  setOpenDropdown: React.Dispatch<React.SetStateAction<string | null>>;
  handleAddTask: () => void;
}

export interface Option {
  id: number;
  name: string;
  icon?: string;
  surname?: string;
  avatar?: string;
  department_id?: number;
}

export interface TaskFormData {
  title: string;
  description: string;
  priority: Option | null;
  status: Option | null;
  department: Option | null;
  assignee: Option | null;
  deadline: string;
}

export interface EmployeeContextType {
  employees: StateProps[];
  addEmployee: (employee: StateProps) => void;
}
