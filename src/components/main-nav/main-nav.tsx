"use client";
import { HTMLAttributes } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Styles from "./main-nav.module.css";

const MainNav = ({ className, ...props }: HTMLAttributes<HTMLElement>) => {
  const pathname = usePathname();
  const combinedClasses = [className].filter(Boolean).join(" ");

  return (
    <nav className={combinedClasses} {...props}>
      <ul className={Styles.navList}>
        <li>
          <Link
            href={"/"}
            className={
              Styles.navLink + (pathname === "/" ? ` ${Styles.active}` : "")
            }
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href={"/learn"}
            className={
              Styles.navLink +
              (pathname === "/learn" ? ` ${Styles.active}` : "")
            }
          >
            Learn
          </Link>
        </li>
        <li>
          <Link
            href={"/create"}
            className={
              Styles.navLink +
              (pathname === "/create" ? ` ${Styles.active}` : "")
            }
          >
            Create deck
          </Link>
        </li>
        <div className={Styles.navHighlight}></div>
      </ul>
    </nav>
  );
};

export { MainNav };
