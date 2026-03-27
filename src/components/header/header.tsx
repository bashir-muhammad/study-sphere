import { HTMLAttributes } from "react";
import Link from "next/link";
import Logo from "@/assets/icons/logo.svg";
import Styles from "./header.module.css";

const Header = ({ className, ...props }: HTMLAttributes<HTMLElement>) => {
  const combinedClasses = [Styles.header, className].filter(Boolean).join(" ");

  return (
    <header className={combinedClasses} {...props}>
      <span className={Styles.yellowbar}></span>
      <div className={Styles.logo}>
        <Link href={"/"}>{<Logo />}</Link>
        <span className="sr-only">Logo: Dimando questionnaire</span>
      </div>
    </header>
  );
};

export { Header };
