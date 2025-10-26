// src/components/atoms/TextArea.tsx
import React from "react";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
  helperText?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void; // Tambahkan onChange
}

export const TextArea: React.FC<TextareaProps> = ({
  error,
  helperText,
  className = "",
  value,
  onChange,
  readOnly = false,
  ...props
}) => {
  return (
    <div className="flex flex-col space-y-1.5">
      <textarea
        id={props.id}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        className={`
          w-full px-3 py-2 text-gray-700 border rounded-lg
          focus:outline-none focus:ring-2 focus:ring-blue-500
          focus:border-transparent
          disabled:bg-gray-100 disabled:cursor-not-allowed
          ${error ? "border-red-500 focus:ring-red-500" : "border-gray-300"}
          ${className}
        `}
        {...props}
      />

      {error ? (
        <p className="text-sm text-red-600">{error}</p>
      ) : helperText ? (
        <p className="text-sm text-gray-500">{helperText}</p>
      ) : null}
    </div>
  );
};
