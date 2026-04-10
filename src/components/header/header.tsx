import { HTMLAttributes } from "react";
import Link from "next/link";
import Logo from "@/assets/icons/logo.svg";
import Styles from "./header.module.css";

const Header = ({ className, ...props }: HTMLAttributes<HTMLElement>) => {
  const combinedClasses = [className].filter(Boolean).join(" ");

  return (
    <header className={Styles.header} {...props}>
      <div className={combinedClasses}>
        <div className={Styles.logo}>
          <Link href={"/"}>{<Logo />}</Link>
          <span className="sr-only">Logo: Dimando questionnaire</span>
        </div>
      </div>
    </header>
  );
};

export { Header };
