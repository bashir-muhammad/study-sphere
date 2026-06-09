import { ReactNode, cloneElement, isValidElement } from "react";
import styles from "./input-field.module.css";

interface InputFieldProps {
  id?: string;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}

interface FormFieldProps {
  id?: string;
  label: string;
  children: ReactNode;
  className?: string;
}

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  id?: string;
  value?: string;
  onChange?: (value: string) => void;
  options: SelectOption[];
}

const InputField = ({ id, value, onChange, placeholder }: InputFieldProps) => {
  return (
    <input
      id={id}
      type="text"
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      className={styles.input}
      placeholder={placeholder}
    />
  );
};

const TextArea = ({ id, value, onChange, placeholder }: InputFieldProps) => {
  return (
    <textarea
      id={id}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      className={styles.input}
      placeholder={placeholder}
    />
  );
};

const Label = ({
  htmlFor,
  children,
}: {
  htmlFor?: string;
  children: ReactNode;
}) => {
  return (
    <label htmlFor={htmlFor} className={styles.label}>
      {children}
    </label>
  );
};

const FormField = ({ id, label, children, className }: FormFieldProps) => {
  const childWithId =
    id && isValidElement(children)
      ? cloneElement(
          children as React.ReactElement,
          { id } as Record<string, string>,
        )
      : children;

  return (
    <div className={className || styles.formField}>
      <Label htmlFor={id}>{label}</Label>
      {childWithId}
    </div>
  );
};

const Select = ({ id, value, onChange, options }: SelectProps) => {
  return (
    <select
      id={id}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      className={styles.select}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export { FormField, InputField, Label, Select, TextArea };
