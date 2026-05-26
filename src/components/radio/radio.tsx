import { InputHTMLAttributes, ReactNode, HTMLAttributes } from "react";
import Styles from "./radio.module.css";

interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  children: ReactNode;
  variant?: "defaultRadio" | "alphabet";
}

const RadioFieldset = ({
  children,
  className,
  legend,
  ...props
}: {
  children: ReactNode;
  className?: string;
  legend?: string;
} & HTMLAttributes<HTMLFieldSetElement>) => {
  const combinedClassName = [Styles.fieldset, className]
    .filter(Boolean)
    .join(" ");
  return (
    <fieldset className={combinedClassName} {...props}>
      {legend && <legend className={"sr-only"}>{legend}</legend>}
      {children}
    </fieldset>
  );
};

const Radio = ({
  className,
  id,
  children,
  variant = "defaultRadio",
  ...props
}: RadioProps) => {
  const inputId = id;
  const combinedClassName = [Styles[variant], className]
    .filter(Boolean)
    .join(" ");
  return (
    <label htmlFor={inputId} className={combinedClassName}>
      <span className={Styles.radio}>
        <input type="radio" id={inputId} className={Styles.input} {...props} />
        <span className={Styles.circle}></span>
      </span>
      <span>{children}</span>
    </label>
  );
};

export { Radio, RadioFieldset };
