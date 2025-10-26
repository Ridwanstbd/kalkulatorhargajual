// src/components/molecules/TextAreaForm.tsx
import React from "react";
import { Label } from "../atoms/Label";
import { TextArea } from "../atoms/TextArea";

interface TextAreaFormProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  htmlFor: string;
  label: string;
  color?: string;
  error?: string;
  helperText?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  readOnly?: boolean;
}

export const TextAreaForm: React.FC<TextAreaFormProps> = ({
  htmlFor,
  label,
  color = "text-slate-700",
  error,
  helperText,
  className = "",
  value,
  onChange,
  readOnly,
  ...props
}) => {
  return (
    <div className="flex flex-col space-y-1.5">
      <Label htmlFor={htmlFor} label={label} color={color} error={!!error} />

      <TextArea
        id={htmlFor}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        error={error}
        helperText={helperText}
        className={className}
        {...props}
      />
    </div>
  );
};
