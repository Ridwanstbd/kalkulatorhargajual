interface InputProps {
  type?: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  error?: boolean;
}

export const Input = ({
  type = "text",
  value,
  onChange,
  placeholder,
  className = "",
  error = false,
}: InputProps) => (
  <input
    type={type}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className={`w-full px-3 py-2 border ${
      error ? "border-red-500" : "border-gray-300"
    } text-black rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${className}`}
  />
);
