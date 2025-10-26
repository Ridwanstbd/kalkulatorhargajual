export interface SelectOption {
  value: string | number;
  label: string;
}

interface SelectProps {
  id: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: SelectOption[];
  ariaLabel?: string;
  className?: string;
  error?: boolean;
}

export const Select = ({
  id,
  value,
  onChange,
  options,
  ariaLabel,
  className = "",
  error = false,
}: SelectProps) => (
  <select
    id={id}
    value={value}
    onChange={onChange}
    aria-label={ariaLabel}
    className={`w-full px-3 py-2 border ${
      error ? "border-red-500" : "border-gray-300"
    } text-black rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${className}`}
  >
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);
