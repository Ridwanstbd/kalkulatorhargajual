interface LabelProps {
  htmlFor: string;
  label: string;
  color: string;
  error?: boolean;
}

export const Label = ({
  htmlFor,
  label,
  color = "text-slate-700",
  error = false,
}: LabelProps) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`block ${error ? "text-red-500" : color} text-sm font-bold`}
    >
      {label}
    </label>
  );
};
