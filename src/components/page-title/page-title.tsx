import { HTMLAttributes } from "react";
import Styles from "./page-title.module.css";

const PageTitle = ({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) => {
  const combinedClassName = `${Styles.pageTitle} ${className || ""}`.trim();

  return (
    <h1 className={combinedClassName} {...props}>
      {children}
    </h1>
  );
};

const PageDescription = ({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) => {
  const combinedClassName =
    `${Styles.pageDescription} ${className || ""}`.trim();

  return (
    <p className={combinedClassName} {...props}>
      {children}
    </p>
  );
};

export { PageTitle, PageDescription };
