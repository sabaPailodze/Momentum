export interface FilterBtnsProps {
  title: string;
  isOpen: boolean;
  setOpenFilter: (title: string | null) => void;
}
