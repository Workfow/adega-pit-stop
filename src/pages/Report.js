import styles from '../styles/pages/Report.module.css';

export default function Report() {
  return (
    <div className={styles.container}>
      <h2>Entradas e Saídas</h2>
      <ul className={styles.out}>
        <li>
          Categoria mais vendida  || Refrigerante
        </li>

        <li>
          Produto mais vendido || Coca Cola
        </li>
      </ul>
      
      <ul className={styles.in} >
        
      </ul>
    </div>
  )
}