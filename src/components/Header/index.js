import { Link } from "react-router-dom";
import styles from '../../styles/components/Header.module.css'

export default function Header({ title }) {
  return (
    <header className={styles.header}>
      <Link to="/">
        <h1>{title}</h1>
      </Link>
    </header>
  );
}
