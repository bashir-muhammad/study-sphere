import { HTMLAttributes } from "react";
import Link from "next/link";
import Logo from "@/assets/icons/logo.svg";
import Styles from "./header.module.css";

const Header = ({ className, ...props }: HTMLAttributes<HTMLElement>) => {
  const combinedClasses = [className].filter(Boolean).join(" ");

  return (
    <header className={Styles.header} {...props}>
      <div className={`${combinedClasses} ${Styles.headerMain}`}>
        <div className={Styles.logo}>
          <Link href={"/"}>{<Logo />}</Link>
          <span className="sr-only">Logo: Dimando questionnaire</span>
        </div>
        <nav>
          <ul className={Styles.navList}>
            <li>
              <Link href={"/"} className={Styles.navLink}>
                Home
              </Link>
            </li>
            <li>
              <Link href={"/learn"} className={Styles.navLink}>
                Learn
              </Link>
            </li>
            <li>
              <Link href={"/create"} className={Styles.navLink}>
                Create deck
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export { Header };
