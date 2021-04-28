import { useState, useEffect, useContext } from "react";
import { FormattedNumber, IntlProvider, FormattedDate } from "react-intl";
import styles from "../styles/pages/Purchases.module.css";
import { FiFileText, FiPlus } from "react-icons/fi";
import api from "../services/api";
import { FinancialContext } from "../contexts/FinancialContext";

export default function Purchases() {
  const {
    handleTogglePdfModal,
    handleTogglePurchaseModal,
    submitForm,
    handleToggleDeletePurchaseModal,
  } = useContext(FinancialContext);
  const [purchases, setPurchases] = useState([]);
  const [totalValue, setTotalValue] = useState(0);
  const [hasDateClicked, setHasDateClicked] = useState(false);

  async function loadPurchases(order) {
    const response = await api.get(`/purchases?order=${order}`);

    setTotalValue(response.data.totalValue);
    setPurchases(response.data.purchases);
  }

  useEffect(() => {
    loadPurchases("DESC");
  }, [submitForm]);

  function handleChangeDateList() {
    setHasDateClicked(!hasDateClicked);

    if(!hasDateClicked) {
      loadPurchases("ASC");
    } else {
      loadPurchases("DESC");
    }
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.titleContainer}>
          <h2>Compras</h2>
          <h3>
            Quando tiver efetuado o pagamento, clique no item para remover.
          </h3>
        </div>

        <div className={styles.listContainer}>
          <IntlProvider locale="pt">
            <ul>
              <header>
                <span className={styles.dateChange} onClick={handleChangeDateList} >
                  { hasDateClicked ? 'CLIQUE AQUI PARA ORGANIZAR POR VENDAS MAIS RECENTES': 'CLIQUE AQUI PARA MUDAR A ORDEM PARA MAIS ANTIGOS'}
                </span>
                <span>Valor total:</span>{" "}
                <span>
                  {" "}
                  <FormattedNumber
                    value={totalValue}
                    style="currency"
                    currency="brl"
                  />{" "}
                </span>
              </header>
              {!purchases ? (
                <h2 style={{ textAlign: 'center'}} >Nenhuma compra cadastrada</h2>
              ) : (
                <div>
                  {purchases.map((item) => (
                    <li key={item.id} onClick={() => handleToggleDeletePurchaseModal(item)}>
                      <span>{item.description} </span>
                      <div>
                        <strong>
                          <FormattedNumber
                            value={item.value}
                            style="currency"
                            currency="BRL"
                          />
                        </strong>
                        <FiFileText
                          onClick={() => handleTogglePdfModal(item.invoice)}
                          size={25}
                        />
                      </div>
                      <strong>
                        <FormattedDate value={item.createdAt}/>
                      </strong>
                    </li>
                  ))}
                </div>
              )}
            </ul>
          </IntlProvider>
        </div>
      </div>
      <button
        onClick={handleTogglePurchaseModal}
        className={styles.addButton}
        type="button"
      >
        <FiPlus size={35} />
      </button>
    </>
  );
}
