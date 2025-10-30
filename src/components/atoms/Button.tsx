interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "danger";
  className?: string;
  disabled?: boolean;
  rounded?: "none" | "sm" | "md" | "lg" | "full" | boolean;
}

export const Button = ({
  children,
  onClick,
  variant = "primary",
  className = "",
  disabled = false,
  rounded = "md", // Default ke rounded-md
}: ButtonProps) => {
  // Konversi nilai rounded ke kelas Tailwind
  const getRoundedClass = () => {
    if (typeof rounded === "boolean") {
      return rounded ? "rounded-full" : "rounded-md";
    }
    return `rounded-${rounded}`;
  };

  const baseClasses = `px-4 py-2 font-medium transition-colors cursor-pointer duration-200 ${getRoundedClass()}`;

  const variantClasses = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  // Tambahkan kelas untuk disabled state
  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "";

  return (
    <button
      onClick={onClick}
      disabled={disabled} // Tambahkan atribut disabled
      className={`${baseClasses} ${variantClasses[variant]} ${disabledClasses} ${className}`}
    >
      {children}
    </button>
  );
};
