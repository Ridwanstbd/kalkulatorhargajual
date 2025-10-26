// D:\kalkulatorhargajual\src\components\molecules\InputForm.tsx
import { Input } from "../atoms/Input";
import { Label } from "../atoms/Label";

interface InputFormProps {
  label: string;
  type?: string;
  value: string | number;
  color?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  error?: string | undefined;
}

export const InputForm = ({
  label,
  type,
  placeholder,
  value,
  color = "text-slate-700",
  onChange,
  error,
}: InputFormProps) => {
  return (
    <>
      <Label htmlFor={label} label={label} color={color} error={!!error} />
      <Input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        error={!!error}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </>
  );
};
