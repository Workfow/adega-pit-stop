import { Link } from "react-router-dom";

import styles from "../styles/pages/Financial.module.css";

export default function Financial() {
  return (
    <div className={styles.container}>
      <h2>Financeiro</h2>
      <div className={styles.sectionCards}>
        <Link to="/purchases">
          <section>
            <h3>Compras</h3>
            <p>Clique aqui para ver suas compras feitas</p>
          </section>
        </Link>
        <Link to="/sales">
          <section>
            <h3>Vendas</h3>
            <p>Clique aqui para ver um relatório de suas vendas</p>
          </section>
        </Link>
        <Link to="/cashier">
          <section>
            <h3>Caixa</h3>
            <p>Clique aqui para abrir ou fechar o caixa</p>
          </section>
        </Link>
      </div>
    </div>
  );
}
