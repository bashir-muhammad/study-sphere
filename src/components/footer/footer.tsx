import { HTMLAttributes } from "react";
import Styles from "./footer.module.css";

interface FooterProps extends HTMLAttributes<HTMLDivElement> {
  data?: {
    copyright?: string;
    links?: {
      url: string;
      name: string;
    }[];
  };
}

const Footer = ({ className, data, ...props }: FooterProps) => {
  const combinedClasses = [Styles.footer, className].filter(Boolean).join(" ");
  return (
    <footer className={combinedClasses} {...props}>
      <span className={Styles.yellowbar}>
        {data?.copyright ?? "Q - All rights reserved 2026."}
      </span>
      <div className={Styles.links}>
        {data?.links?.map((link) => (
          <a key={link.name} href={link.url}>
            {link.name}
          </a>
        ))}
      </div>
    </footer>
  );
};

export { Footer };
