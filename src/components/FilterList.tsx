import { Active } from "../types/types";

const radios = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Completed",
    value: "completed",
  },
  {
    label: "Not Completed",
    value: "not-completed",
  },
] as const;

interface IFilterListProps {
  active: Active;
  handleActive: (val: Active) => void;
}

export default function FilterList({ active, handleActive }: IFilterListProps) {
  return (
    <div className="radio-inputs">
      {radios.map((radio) => (
        <label className="radio" key={radio.value}>
          <input
            type="radio"
            name="radio"
            checked={active === radio.value}
            onChange={() => handleActive(radio.value)}
          />
          <span className="name">{radio.label}</span>
        </label>
      ))}
    </div>
  );
}
