import { useState, useEffect, useContext } from "react";
import { FormattedNumber, IntlProvider } from "react-intl";
import styles from "../styles/pages/Purchases.module.css";
import { FiFileText, FiPlus } from "react-icons/fi";
import api from "../services/api";
import { FinancialContext } from "../contexts/FinancialContext";

export default function Purchases() {
  const { handleTogglePdfModal } = useContext(FinancialContext);
  const [purchases, setPurchases] = useState([]);
  const [totalValue, setTotalValue] = useState(0);

  async function loadPurchases() {
    const response = await api.get("/purchases");

    setTotalValue(response.data.totalValue);
    setPurchases(response.data.purchases);
  }

  useEffect(() => {
    loadPurchases();
  }, []);

  return (
    <>
      <div className={styles.container}>
        <h2>Compras</h2>

        <div className={styles.listContainer}>
          <IntlProvider locale="pt">
            <ul>
              <header>
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
              {purchases.map((item) => (
                <li>
                  <span>{item.description} </span>
                  <div>
                    <strong>
                      <FormattedNumber
                        value={item.value}
                        style="currency"
                        currency="BRL"
                      />
                    </strong>
                    <FiFileText onClick={handleTogglePdfModal} size={25} />
                  </div>
                </li>
              ))}
            </ul>
          </IntlProvider>
        </div>
      </div>
      <button className={styles.addButton} type="button">
        <FiPlus size={35} />
      </button>
    </>
  );
}
