import { Select, SelectOption } from "../atoms/Select";
import { Label } from "../atoms/Label";

interface SelectFormProps {
  label: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: SelectOption[];
  ariaLabel?: string;
  color?: string;
  className?: string;
  error?: string | undefined;
}

export const SelectForm = ({
  label,
  value,
  onChange,
  options,
  ariaLabel,
  color = "text-slate-700",
  className,
  error,
}: SelectFormProps) => {
  return (
    <>
      <Label htmlFor={label} label={label} color={color} error={!!error} />
      <Select
        id={label}
        value={value}
        onChange={onChange}
        options={options}
        ariaLabel={ariaLabel || label}
        className={className}
        error={!!error}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </>
  );
};
