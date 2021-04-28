import { useContext, useEffect } from "react";
import { IntlProvider, FormattedNumber } from "react-intl";

import { FinancialContext } from "../../contexts/FinancialContext";
import styles from "../../styles/components/DeletePurchaseModal.module.css";

export default function DeletePurchaseModal() {
  const { handleToggleDeletePurchaseModal, deleteData, handleDeletePurchases } = useContext(
    FinancialContext
  );

  return (
    <div className={styles.overlay}>
      <IntlProvider locale="pt">
        <div className={styles.modal}>
          <h2>Ja efetuou o pagamento?</h2>
          <h3>Clique em sim para apagar o registro </h3>

          <div>
            <strong>{deleteData.description}</strong>
            <span>
              <FormattedNumber
                value={deleteData.value}
                style="currency"
                currency="BRL"
              />
            </span>
          </div>

          <div className={styles.productsList} >
            <table>
              <thead>
                <tr>
                  <th>Produto</th>
                  <th>Quantidade</th>
                  <th>Custo</th>
                </tr>
              </thead>
              <tbody>
                {deleteData.products.map(item => (
                  <tr>
                    <td>{item.name}</td>
                    <td>{item.amount}</td>
                    <td>
                      <FormattedNumber value={item.cost} style="currency" currency="BRL" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div>
            <button onClick={handleToggleDeletePurchaseModal}>Não</button>
            <button onClick={() => handleDeletePurchases(deleteData.id)}>Sim</button>
          </div>
        </div>
      </IntlProvider>
    </div>
  );
}
