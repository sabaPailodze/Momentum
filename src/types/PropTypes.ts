export interface FilterBtnsProps {
  title: string;
  isOpen: boolean;
  setOpenFilter: (title: string | null) => void;
}

export interface StateProps {
  id: number;
  name: string;
}

export interface ErrorState {
  departments?: string;
  priorities?: string;
  employees?: string;
}
