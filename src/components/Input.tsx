interface IInputProps {
  type: "text" | "email" | "password" | "number";
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export default function Input({
  type,
  placeholder,
  value,
  onChange,
  className = "",
}: Readonly<IInputProps>) {
  return (
    <input
      className={className}
      value={value}
      onChange={onChange}
      type={type}
      placeholder={placeholder}
    />
  );
}
