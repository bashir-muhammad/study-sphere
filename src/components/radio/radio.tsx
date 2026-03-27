import { InputHTMLAttributes } from "react";
import Styles from "./radio.module.css";

const Radio = ({
  className,
  id,
  children,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) => {
  const inputId = id;
  return (
    <label
      htmlFor={inputId}
      className={[Styles.wrapper, className].filter(Boolean).join(" ")}
    >
      <span className={Styles.radio}>
        <input type="radio" id={inputId} className={Styles.input} {...props} />
        <span className={Styles.circle}></span>
      </span>
      <span>{children}</span>
    </label>
  );
};

export { Radio };
