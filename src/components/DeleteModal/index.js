import { useContext, useEffect, useState } from "react";
import { InventoryContext } from "../../contexts/InventoryContext";
import styles from "../../styles/components/DeleteModal.module.css";

import api from "../../services/api";

export default function DeleteModal() {
  const { handleToggleModal, handleToggleDeleteModal, deleteData } = useContext(
    InventoryContext
  );
  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    handleToggleModal();
  }, []);

  async function handleDeleteProduct() {
    setIsDeleted(true);
    api.delete(`/products/${deleteData.id}`)
      .then(handleToggleDeleteModal());

    
  }

  return (
    <div className={styles.overlay}>
      {isDeleted ? (
        ""
      ) : (
        <div className={styles.modal}>
          <h2>Deseja excluir este produto ?</h2>
          <img
            src={
              require(`../../uploads/images/${
                deleteData.icon ? deleteData.icon : "noImage.png"
              }`).default
            }
            alt=""
          />
          <strong>{deleteData.name}</strong>

          <div className={styles.buttonsContainer}>
            <button onClick={handleToggleDeleteModal}>Não</button>
            <button onClick={handleDeleteProduct}>Sim</button>
          </div>
        </div>
      )}
    </div>
  );
}
