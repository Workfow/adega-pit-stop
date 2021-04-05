import { useEffect, useState, useContext } from "react";
import styles from "../../styles/components/SaleModal.module.css";
import socket from "../../services/socket";
import { FiMinus, FiX, FiDollarSign } from "react-icons/fi";
import { SalesContext } from "../../contexts/SalesContext";
import AmountInput from "../AmountInput/index";
import { IntlProvider, FormattedNumber } from "react-intl";

export default function SaleModal() {
  const {
    handleToggleSaleModal,
    closeSaleModal,
    setIsSaleModalActive,
    products,
    totalValue,
    finishSale,
  } = useContext(SalesContext);
  const [changeClass, setChangeClass] = useState(styles.invisible);
  const [changeInput, setChangeInput] = useState("");
  const [changeValue, setChangeValue] = useState(0);
  const [isConfirmWindowOpen, setIsConfirmWindowOpen] = useState(false);

  useEffect(() => {
    socket.on("confirm_sale", () => {
      setIsConfirmWindowOpen(false);
      closeSaleModal();
    });
  }, []);

  function handleCloseModal() {
    setIsConfirmWindowOpen(false);
    closeSaleModal();
  }

  function minimizeModal() {
    setIsSaleModalActive(true);
    handleToggleSaleModal();
  }

  function handleChangeInput(value) {
    if (changeInput.length < 8 || value.length < changeInput.length) {
      setChangeInput(value);
    }
  }

  useEffect(() => {
    if (changeInput !== "") {
      setChangeClass("");
      setChangeValue(changeInput - totalValue);
    } else {
      setChangeClass(styles.invisible);
    }
  }, [changeInput]);

  return (
    <>
      <IntlProvider locale="pt">
        <div className={styles.modal}>
          <div className={styles.controlButtons}>
            <FiMinus onClick={minimizeModal} size={35} />
            <FiX onClick={() => setIsConfirmWindowOpen(true)} size={35} />
          </div>

          <div className={styles.products}>
            {products.map((item) => (
              <div>
                <span>{item.name}</span>
                <div className={styles.priceContainer}>
                  <span>
                    <FormattedNumber
                      value={item.price}
                      style="currency"
                      currency="BRL"
                    />
                  </span>
                  <AmountInput currentItem={item.barcode} />
                </div>
              </div>
            ))}
          </div>

          <div className={styles.details}>
            <div>
              <h3>Valor Total</h3>
              <span>
                <FormattedNumber
                  value={totalValue}
                  style="currency"
                  currency="BRL"
                />
              </span>
            </div>

            <div>
              <h3>Valor recebido</h3>
              <input
                placeholder="R$ 0,00"
                value={changeInput}
                onChange={(event) => handleChangeInput(event.target.value)}
                type="number"
              />
            </div>

            <div className={changeClass}>
              <h3>Troco</h3>
              <span>
                <FormattedNumber
                  value={changeValue}
                  style="currency"
                  currency="BRL"
                />
              </span>
            </div>

            <button onClick={finishSale}>Finalizar</button>
          </div>
        </div>
      </IntlProvider>
      {isConfirmWindowOpen && (
        <div className={styles.confirmWindowOverlay}>
          <div className={styles.confirmWindow}>
            <h2>Você tem certeza que deseja cancelar essa venda?</h2>
            <div>
              <button onClick={() => setIsConfirmWindowOpen(false)}>Não</button>
              <button onClick={handleCloseModal}>Sim</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export function SaleModalButton() {
  const { handleToggleSaleModal } = useContext(SalesContext);

  return (
    <button onClick={handleToggleSaleModal} className={styles.saleModalButton}>
      <FiDollarSign size={35} color="#FFF" />
    </button>
  );
}
