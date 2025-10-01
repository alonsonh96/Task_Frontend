import type { FieldError } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";

interface TextAreaFieldProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  errors?: FieldError;
  register?: any; 
}


const TextAreaField = ({ errors, register, className, ...props }: TextAreaFieldProps) => {
  return (
    <>
      <textarea
        {...register}
        {...props}
        className={`w-full px-4 py-3 bg-slate-900/50 border rounded-lg focus:outline-none 
          transition-all text-white placeholder-slate-500 resize-none
          ${errors
            ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500/50"
            : "border-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50"}
          ${className ?? ""}
        `}
      />
      {errors && <ErrorMessage>{errors.message}</ErrorMessage>}
    </>
  );
};

export default TextAreaField;
