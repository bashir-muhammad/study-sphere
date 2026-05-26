import { HTMLAttributes } from "react";
import Link from "next/link";
import Logo from "@/assets/icons/logo.svg";
import { MainNav } from "../main-nav/main-nav";
import Styles from "./header.module.css";

const Header = ({ className, ...props }: HTMLAttributes<HTMLElement>) => {
  const combinedClasses = [className].filter(Boolean).join(" ");

  return (
    <header className={Styles.header} {...props}>
      <div className={`${combinedClasses} ${Styles.headerMain}`}>
        <Link className={Styles.logo} href={"/"}>
          <span className={Styles.logoIcon}>{<Logo />}</span>{" "}
          <span className={Styles.logoText}>Study Sphere</span>
        </Link>
        <MainNav
          links={[
            { label: "Home", href: "/" },
            { label: "Learn", href: "/learn" },
            { label: "Create Deck", href: "/create" },
          ]}
        />
      </div>
    </header>
  );
};

export { Header };
