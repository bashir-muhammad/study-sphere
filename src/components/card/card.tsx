import { HTMLAttributes } from "react";
import Styles from "./card.module.css";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "completed" | "result";
}

const Card = ({
  variant = "default",
  className,
  children,
  ...props
}: CardProps) => {
  const combinedClasses = [Styles.card, Styles[variant], className]
    .filter(Boolean)
    .join(" ");
  return (
    <div className={combinedClasses} {...props}>
      {children}
    </div>
  );
};

const CardTitle = ({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) => {
  const combinedClasses = [Styles.title, className].filter(Boolean).join(" ");
  return (
    <h2 className={combinedClasses} {...props}>
      {children}
    </h2>
  );
};

const CardDescription = ({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) => {
  const combinedClasses = [Styles.title, className].filter(Boolean).join(" ");
  return (
    <p className={combinedClasses} {...props}>
      {children}
    </p>
  );
};

const CardFooter = ({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  const combinedClasses = [Styles.footer, className].filter(Boolean).join(" ");
  return (
    <div className={combinedClasses} {...props}>
      {children}
    </div>
  );
};

export { Card, CardTitle, CardDescription, CardFooter };
