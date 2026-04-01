import type { HTMLAttributes, ReactNode } from "react";
import Styles from "./badge.module.css";

interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: "primary" | "tertiary" | "success" | "warning" | "error";
}

const Badge = ({
  children,
  variant = "primary",
  className,
  ...props
}: BadgeProps) => {
  const combinedClassName = [Styles.badge, Styles[variant], className]
    .filter(Boolean)
    .join(" ");
  return (
    <div className={combinedClassName} {...props}>
      {children}
    </div>
  );
};

export { Badge };
