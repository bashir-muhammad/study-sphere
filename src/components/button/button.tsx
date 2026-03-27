import { ButtonHTMLAttributes, AnchorHTMLAttributes, ElementType } from "react";
import Link from "next/link";
import styles from "./button.module.css";

interface ButtonBaseProps {
  variant?: "primary" | "secondary" | "tertiary" | "icon" | "ghost";
  size?: "sm" | "md" | "lg";
  as?: ElementType;
  disabled?: boolean;
}

interface ButtonAsButton
  extends ButtonBaseProps, ButtonHTMLAttributes<HTMLButtonElement> {
  as?: "button";
}

interface ButtonAsAnchor
  extends ButtonBaseProps, AnchorHTMLAttributes<HTMLAnchorElement> {
  as?: "a";
  href: string;
}

interface ButtonAsLink
  extends ButtonBaseProps, AnchorHTMLAttributes<HTMLAnchorElement> {
  as: "link";
  href: string;
}

type ButtonProps = ButtonAsButton | ButtonAsAnchor | ButtonAsLink;
const Button = ({
  variant = "primary",
  size = "md",
  className,
  as: Component = "button",
  disabled = false,
  ...props
}: ButtonProps) => {
  const combinedClasses = [
    styles.button,
    styles[variant],
    variant !== "icon" && styles[size],
    disabled && styles.disabled,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (Component === "link") {
    const { href, ...rest } = props as ButtonAsLink;

    if (disabled) {
      return (
        <span
          className={combinedClasses}
          aria-disabled={true}
          role="link"
          {...rest}
        />
      );
    }

    return (
      <Link
        href={href}
        className={combinedClasses}
        aria-disabled={disabled}
        {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
      />
    );
  }

  if (Component === "a") {
    return (
      <Component
        className={combinedClasses}
        aria-disabled={disabled}
        {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
      />
    );
  }
  return (
    <Component
      className={combinedClasses}
      disabled={disabled}
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
    />
  );
};

export { Button };
