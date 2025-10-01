import { type ReactNode } from "react";

interface LabelFieldProps {
  htmlFor?: string;
  icon?: ReactNode;
  children: ReactNode;
}

const LabelField = ({ htmlFor, icon, children }: LabelFieldProps) => {
  return (
    <label
      htmlFor={htmlFor}
      className="flex items-center text-slate-300 text-md font-medium mb-2"
    >
      {icon && (
        <div className="p-2 rounded-lg">
          {icon}
        </div>
      )}
      {children}
    </label>
  );
};

export default LabelField;
