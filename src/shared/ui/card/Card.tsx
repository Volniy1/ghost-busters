import styles from "./card.module.scss";

interface ICardProps {
  className?: string;
}

export function Card({ className }: ICardProps) {
  return <div className={`${styles.card} ${className ?? ""}`}></div>;
}
