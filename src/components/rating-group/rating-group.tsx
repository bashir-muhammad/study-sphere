"use client";
import Styles from "./rating-group.module.css";
interface RatingGroupProps {
  className?: string;
  value: number;
  max: number;
  onChange: (value: number) => void;
}

const RatingGroup = ({ className, value, max, onChange }: RatingGroupProps) => {
  const combinedClasses = [Styles.ratingroup, className]
    .filter(Boolean)
    .join(" ");
  const ratings = Array.from({ length: max }, (_, i) => i + 1);
  return (
    <ul className={combinedClasses} role="radiogroup">
      {ratings.map((num) => (
        <li key={num}>
          <button
            type="button"
            onClick={() => onChange(num)}
            aria-pressed={value === num}
            className={Styles.button}
          >
            {num}
          </button>
        </li>
      ))}
    </ul>
  );
};

export { RatingGroup };
