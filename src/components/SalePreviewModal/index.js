import { useContext, useEffect } from "react";
import { IntlProvider, FormattedNumber, FormattedDate } from "react-intl";
import { FiX } from "react-icons/fi";
import { SalesContext } from "../../contexts/SalesContext";

import styles from "../../styles/components/SalePreviewModal.module.css";

export default function SalePreviewModal() {
  const { handleToggleSalePreviewModal, currentItemPreview, handleDeleteSale } = useContext(
    SalesContext
  );

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <FiX onClick={handleToggleSalePreviewModal} size={20} />
        <h2>Detalhes da venda</h2>
        <h4>Descrição</h4>
        <div className={styles.descriptionContainer}>
          {currentItemPreview.description.map((item) => (
            <span>{item}</span>
          ))}
        </div>
        <IntlProvider locale="pt">
          <div className={styles.titleContainer} >
            <h4>Valor</h4>
            <h4>Data</h4>
          </div>
          <div className={styles.detailsContainer}>
            <span><FormattedNumber value={currentItemPreview.value} style="currency" currency="BRL" /></span>
            <span><FormattedDate value={currentItemPreview.createdAt} /></span>
          </div>
        </IntlProvider>

          <h4>Deseja excluir este registro de venda ?</h4>
        <div className={styles.buttonsContainer} >
          <button onClick={handleToggleSalePreviewModal} >Não</button>
          <button onClick={handleDeleteSale} >Sim</button>
        </div>
      </div>
    </div>
  );
}
