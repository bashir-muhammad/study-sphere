import type { HTMLAttributes } from "react";
import Styles from "./badge.module.css";

interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  variant?: "primary" | "tertiary" | "success" | "warning" | "error";
}

const Badge = ({ label, variant = "primary", className }: BadgeProps) => {
  const combinedClassName = [Styles.badge, Styles[variant], className]
    .filter(Boolean)
    .join(" ");
  return <div className={combinedClassName}>{label}</div>;
};

export { Badge };
