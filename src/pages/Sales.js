import { useState, useEffect, useContext } from "react";
import { IntlProvider, FormattedNumber, FormattedDate } from "react-intl";
import { SalesContext } from '../contexts/SalesContext';

import styles from "../styles/pages/Sales.module.css";

export default function Sales() {
  const { handleToggleSalePreviewModal, loadSales, sales, salesTotalValue } = useContext(SalesContext);
  

  useEffect(() => {
    loadSales();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <h2>Vendas</h2>
        <h3>
          Todas as suas vendas vão aparecer aqui, não esqueça de excluir as mais
          antigas
        </h3>
      </div>

      <div className={styles.listContainer}>
        <IntlProvider locale="pt">
          <ul>
            <header>
              <span>Valor total:</span>
              <span>
                <FormattedNumber
                  value={salesTotalValue}
                  style="currency"
                  currency="BRL"
                />
              </span>
            </header>
            {!sales ? (
              <h2>Nenhuma venda feita ainda</h2>
            ) : (
              <div>
                {sales.map((item) => (
                  <li onClick={() => handleToggleSalePreviewModal(item)} >
                    <span>{item.description}</span>
                    <div>
                      <span>
                        <FormattedNumber
                          value={item.value}
                          style="currency"
                          currency="BRL"
                        />
                      </span>
                      <span>
                        <FormattedDate value={item.createdAt} />
                      </span>
                    </div>
                  </li>
                ))}
              </div>
            )}
          </ul>
        </IntlProvider>
      </div>
    </div>
  );
}
