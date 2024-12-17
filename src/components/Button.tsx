interface IButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button";
}

export default function Button({
  children,
  className = "",
  onClick,
  type = "button",
}: Readonly<IButtonProps>) {
  return (
    <button className={className} onClick={onClick} type={type}>
      {children}
    </button>
  );
}
