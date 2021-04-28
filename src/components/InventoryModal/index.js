import { useContext, useRef, useEffect, useState } from "react";
import { Form } from "@unform/web";
import * as Yup from "yup";
import { setLocale } from "yup";
import translation from "../../utils/YupTranslation";
import styles from "../../styles/components/InventoryModal.module.css";
import { InventoryContext } from "../../contexts/InventoryContext";
import api from '../../services/api';
import socket from "../../services/socket";

import { FiX } from "react-icons/fi";
import Input from "../../components/Input";
import Select from 'react-select';
import Button from "../Button";
import ImageInput from "../ImageInput";

export default function InventoryModal({ buttonText, update }) {
  const {
    handleToggleModal,
    submitForm,
    submitUpdateForm,
    currentData,
  } = useContext(InventoryContext);
  const formRef = useRef();
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [options, setOptions ] = useState([]);
  const [ selectedValue, setSelectedValue ] = useState({});

  useEffect(() => {
    console.log(selectedValue);
  }, [selectedValue])

  setLocale(translation);

  async function handleSubmit(data, { reset }) {
    if (update) {
      try {
        formRef.current.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().min(4).required(),
          cost: Yup.number().min(1).required(),
          price: Yup.number().required(),
          amount: Yup.number().required(),
        });

        await schema.validate(data, {
          abortEarly: false,
        });
        setIsSuccessful(true);
        reset();
        submitUpdateForm(data, selectedValue);
      } catch (error) {
        const validationErrors = {};

        if (error instanceof Yup.ValidationError) {
          error.inner.forEach((err) => {
            validationErrors[err.path] = err.message;
          });
        }

        formRef.current.setErrors(validationErrors);
        console.log(validationErrors);
      }
    } else {
      try {
        formRef.current.setErrors({});

        const schema = Yup.object().shape({
          barcode: Yup.string().min(6).required(),
          name: Yup.string().min(4).required(),
          cost: Yup.number().required(),
          price: Yup.number().required(),
          amount: Yup.number().required(),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        console.log(data);
        submitForm(data, selectedValue);
        setIsSuccessful(true);
        reset();
      } catch (error) {
        const validationErrors = {};

        if (error instanceof Yup.ValidationError) {
          error.inner.forEach((err) => {
            validationErrors[err.path] = err.message;
          });
        }

        formRef.current.setErrors(validationErrors);
        console.log(validationErrors);
      }
    }
  }

  async function loadCategories() {
    const response = await api.get('/categories');
    
    const loadedCategories = response.data;

    const categoryOptions = loadedCategories.map(item => {
      return {
        value: item.id,
        label: item.name
      }
    })
    
    setOptions(categoryOptions);
  }

  async function loadDefaultValue() {
    const response = await api.get(`/categories/${currentData.category_id}`)

    const loadedCategory = response.data;

    const categoryOption = {
      value: loadedCategory.id,
      label: loadedCategory.name
    }

    setSelectedValue(categoryOption);

  }

  useEffect(() => {
    loadCategories();
    loadDefaultValue();
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setIsSuccessful(false);
    }, 2000);
  }, [isSuccessful]);

  useEffect(() => {
    update
      ? formRef.current.setData({
          name: currentData.name,
          cost: currentData.cost,
          price: currentData.price,
          amount: currentData.amount,
        })
      : formRef.current.setData({ name: "", barcode: "" });
  }, [currentData, update]);

  useEffect(() => {
    socket.on("change_input", (data) => {
      setTimeout(() => {
        formRef.current?.setData({
          barcode: data.barcode,
          name: data.name,
          cost: data.cost,
          price: data.price,
          amount: data.amount,
        });
      }, 200);
    });
  }, []);

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#585191' : '#FFFFFF',
    }),
    control: (provided, state) => ({
      minHeight: 46,
      width: 300,
      border: state.isFocused ? '2px solid #585191' :'2px solid #c1c1c1',
      borderRadius: 8,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all .3s',
    }),
    dropdownIndicator: (provided, state) => ({
      width: '2.3rem',
    }),
    clearIndicator: (provided, state) => ({
      position: 'absolute',
      right: 0,
      bottom: '2.3rem'
    })
  }

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
                currentData.icon
                  ? `http://localhost:3333/icon?icon=${currentData.icon}`
                  : require("../../uploads/images/noImage.png").default
              }
              alt=""
            />
          ) : (
            <img src={require("../../uploads/images/noImage.png").default} />
          )}
          <ImageInput
            name="icon"
            placeholder="Clique para escolher uma imagem"
          />
          {!update && <Input name="barcode" placeholder="Código de barras" />}
          <Input name="name" placeholder="Nome do produto" maxlength="40" />
          <Input 
            name="cost"
            type="number"
            step="0.01"
            placeholder="Valor de custo"
          />
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
            <Select
            value={selectedValue}
            onChange={selectedOption => setSelectedValue(selectedOption)}
            options={options}
            className={styles.select}
            styles={customStyles}
          />
          ) : (
            <Select
            onChange={selectedOption => setSelectedValue(selectedOption)}
            options={options}
            className={styles.select}
            styles={customStyles}
          />
          )}

          {update ? (
            <Button type="submit">Atualizar</Button>
          ) : (
            <Button type="submit">Cadastrar</Button>
          )}
          {isSuccessful && (
            <div className={styles.successWarn}>
              {update ? (
                <span>Produto atualizado com sucesso</span>
              ) : (
                <span>Produto cadastrado com sucesso</span>
              )}
            </div>
          )}
        </Form>
      </div>
    </div>
  );
}
