import { useContext, useEffect, useRef, useState } from 'react';
import { FiX } from "react-icons/fi";
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { setLocale } from 'yup';
import translation from '../../utils/YupTranslation';
import { FinancialContext } from '../../contexts/FinancialContext';
import api from '../../services/api';

import styles from '../../styles/components/PurchaseModal.module.css';
import PdfInput from '../PdfInput';
import Input from '../Input';
import Button from '../Button';
import Select from 'react-select';
import AmountInput from '../AmountInput';

export default function PurchaseModal() {
  const { handleTogglePurchaseModal, submitForm, selectedProducts, setSelectedProducts } = useContext(FinancialContext);
  const [ options, setOptions ] = useState([]);
  const formRef = useRef();

  setLocale(translation);

  async function handleSubmit(data, {reset}) {
    
    try {
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        description: Yup.string().min(4).required(),
        value: Yup.number().required()
      })

      await schema.validate(data, {
        abortEarly: false
      })

      submitForm(data, selectedProducts);

      reset();

    } catch (error ) {
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

  function handleChange(selectedOptions) {
    setSelectedProducts(selectedOptions)
  }

  async function loadAvailableProducts() {
    const response = await api.get('/products');

    const loadedProducts = response.data;

    const productOptions = loadedProducts.map(item => {
      return {
        value: item.id,
        label: item.name,
        amount: 1
      }
    })
    
    setOptions(productOptions);
  }

  useEffect(() => {
    loadAvailableProducts();
  }, [])

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
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
        <button onClick={handleTogglePurchaseModal}>
          <FiX size={20} />
        </button>
        <h2>Adicionar compra</h2>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <PdfInput name="invoice" placeholder="Clique aqui para adicionar um pdf" />
          <Input name="description" placeholder="Nome/Descrição da compra" />
          <Input name="value" type="number" step="0.01" placeholder="Valor da compra" />
          <Select 
            options={options}
            onChange={handleChange}
            styles={customStyles} 
            className={styles.select}
            isMulti
            placeholder="Produtos comprados"
          />
          {selectedProducts?.length > 0 && (
            <div className={styles.products} >
            {selectedProducts?.map(item => (
              <div className={styles.productItem}>
                <span className={styles.itemName} >{item.label}</span>
                <AmountInput currentItem={item} purchase={true} name="amount" type="number"/>
              </div>
            ))}
          </div>
          )}
          <Button type="submit">
            Cadastrar
          </Button>
        </Form>
      </div>
    </div>
  )
}