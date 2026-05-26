"use client";
import { HTMLAttributes } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Styles from "./main-nav.module.css";

interface MainNavProps extends HTMLAttributes<HTMLElement> {
  links: {
    label: string;
    href: string;
  }[];
}

const MainNav = ({ className, links, ...props }: MainNavProps) => {
  const pathname = usePathname();
  const combinedClasses = [className].filter(Boolean).join(" ");

  return (
    <nav className={combinedClasses} {...props}>
      {links?.length > 0 && (
        <ul className={Styles.navList}>
          {links.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={
                  Styles.navLink +
                  (pathname === item.href ? ` ${Styles.active}` : "")
                }
                aria-current={pathname === item.href ? "page" : undefined}
              >
                {item.label}
              </Link>
            </li>
          ))}
          <div className={Styles.navHighlight}></div>
        </ul>
      )}
    </nav>
  );
};

export { MainNav };
