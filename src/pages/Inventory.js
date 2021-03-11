import { useEffect, useState, useContext } from "react";
import { FiPlus, FiTrash } from "react-icons/fi";
import { FormattedNumber, IntlProvider } from "react-intl";
import api from "../services/api";
import styles from "../styles/pages/Inventory.module.css";

import { InventoryContext } from "../contexts/InventoryContext";
import noImage from "../uploads/images/noImage.png";

export default function Estoque() {
  const {
    handleToggleModal,
    handleToggleDeleteModal,
    updateData,
    setIsUpdating,
    submitForm,
    submitUpdateForm,
  } = useContext(InventoryContext);
  const [isLoading, setIsLoading] = useState();
  const [products, setProducts] = useState([]);

  async function loadProducts() {
    setIsLoading(true);
    const response = await api.get("/products");

    setProducts(response.data);
    setIsLoading(false);
  }

  useEffect(() => {
    loadProducts();
  }, [submitForm]);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {setIsLoading(false)}, 1000);
    loadProducts();
  }, [submitUpdateForm]);

  function toggleModal() {
    setIsUpdating(false);
    handleToggleModal();
  }

  return (
    <>
      <div className={styles.container}>
        <h2>Estoque</h2>

        {isLoading ? (
          " "
        ) : (
          <div className={styles.cardsContainer}>
            {products.map((item) => (
              <div onClick={() => updateData(item)} key={item.id}>
                <FiTrash
                  onClick={() => handleToggleDeleteModal(item)}
                  className={`${styles.invisible} ${styles.delete}`}
                  size={20}
                />
                <img
                  src={
                    item.icon
                      ? require(`../uploads/images/${item.icon}`).default
                      : noImage
                  }
                  alt={item.icon}
                  className={item.icon ? styles.icon : styles.noImage}
                />
                <strong>{item.name}</strong>
                <IntlProvider locale="pt">
                  <span className={styles.value}>
                    <FormattedNumber
                      value={item.price}
                      style="currency"
                      currency="BRL"
                    />
                  </span>
                </IntlProvider>

                <span>{item.amount} und</span>
              </div>
            ))}
          </div>
        )}
      </div>
      <button className={styles.addButton} type="button" onClick={toggleModal}>
        <FiPlus size={35} />
      </button>
    </>
  );
}
