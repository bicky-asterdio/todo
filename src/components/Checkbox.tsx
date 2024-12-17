interface ICheckboxProps {
  checked: boolean;
  id: string;
  onChange: () => void;
  label: string;
  className?: string;
}

export default function Checkbox({
  checked,
  id,
  onChange,
  label,
  className = "",
}: ICheckboxProps) {
  return (
    <div className={`checkbox ${className}`}>
      <input type="checkbox" id={id} checked={checked} onChange={onChange} />
      <label
        htmlFor={id}
        style={{ textDecoration: checked ? "line-through" : "none" }}
      >
        {label}
      </label>
    </div>
  );
}
