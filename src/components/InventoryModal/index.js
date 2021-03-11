import { useContext, useRef, useEffect, useState } from "react";
import { Form } from "@unform/web";
import styles from "../../styles/components/InventoryModal.module.css";
import { InventoryContext } from "../../contexts/InventoryContext";

import { FiX } from "react-icons/fi";
import Input from "../../components/Input";
import Button from "../Button";
import ImageInput from "../ImageInput";

import noImage from "../../uploads/images/noImage.png";

export default function InventoryModal({ buttonText, update }) {
  const { handleToggleModal, submitForm, submitUpdateForm, currentData } = useContext(
    InventoryContext
  );
  const formRef = useRef(null);

  function handleSubmit(data, { reset }) {
    if (update) {
      submitUpdateForm(data);
    } else {
      submitForm(data);
    }

    reset();
  }

  useEffect(() => {
    update
      ? formRef.current.setData({
          name: currentData.name,
          price: currentData.price,
          amount: currentData.amount,
        })
      : formRef.current.setData({ name: "" });
  }, [currentData, update]);

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button onClick={handleToggleModal}>
          <FiX size={20} />
        </button>
        <h2>
          {update
            ? "Atualizar produto no estoque"
            : "Cadastrar produto no estoque"}
        </h2>
        <Form ref={formRef} onSubmit={handleSubmit}>
          {update ? (
            <img
              src={
                require(`../../uploads/images/${
                  currentData.icon ? currentData.icon : "noImage.png"
                }`).default
              }
              alt=""
            />
          ) : (
            <img src={require('../../uploads/images/noImage.png').default} />
          )}
          <ImageInput
            name="icon"
            placeholder="Clique para escolher uma imagem"
          />
          <Input name="name" placeholder="Nome do produto" maxlength="40" />
          <Input
            name="price"
            type="number"
            step="0.01"
            placeholder="Valor do produto"
          />
          <Input
            name="amount"
            type="number"
            min="0"
            placeholder="Quantidade do produto"
          />

          {update ? (
            <Button type="submit">Atualizar</Button>
          ) : (
            <Button type="submit">Cadastrar</Button>
          )}
        </Form>
      </div>
    </div>
  );
}
