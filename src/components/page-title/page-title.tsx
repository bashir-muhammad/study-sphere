import { HTMLAttributes } from "react";
import Styles from "./page-title.module.css";

const PageTitle = ({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) => {
  return (
    <h1 className={`${Styles.pageTitle} ${className}`} {...props}>
      {children}
    </h1>
  );
};

const PageDescription = ({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) => {
  return (
    <p className={`${Styles.pageDescription} ${className}`} {...props}>
      {children}
    </p>
  );
};

export { PageTitle, PageDescription };
