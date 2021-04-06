import { Link } from 'react-router-dom'
import styles from '../styles/pages/InventoryDash.module.css';

export default function InventoryDash() {
  return (
    <div className={styles.container} >
      <h2>Estoque</h2>
      <div className={styles.sectionCards}>
        <Link to="/category">
          <section>
            <h3>Categorias</h3>
            <p>Clique aqui para ver suas compras feitas</p>
          </section>
        </Link>
        <Link to="/inventory">
          <section>
            <h3>Produtos</h3>
            <p>Clique aqui para ver um relatório de suas vendas</p>
          </section>
        </Link>
      </div>
    </div>
  )
}