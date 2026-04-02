import type { HTMLAttributes } from "react";
import Styles from "./progress.module.css";

interface ProgressProps extends HTMLAttributes<HTMLProgressElement> {
  variant?: "primary" | "tertiary";
  value: string;
}

const Progress = ({
  variant = "primary",
  className,
  value = "50%",
}: ProgressProps) => {
  const combinedClassName = [Styles.progress, Styles[variant], className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={combinedClassName}>
      <div className={Styles.progressBar} style={{ width: value }}></div>
      <progress className={Styles.progressNative} value={value} max={100}>
        {value}
      </progress>
    </div>
  );
};

const ProgressLabel = ({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLLabelElement>) => {
  const combinedClassName = [Styles.label, className].filter(Boolean).join(" ");
  return (
    <label className={combinedClassName} {...props}>
      {children}
    </label>
  );
};

export { Progress, ProgressLabel };
