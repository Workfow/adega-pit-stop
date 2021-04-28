import { useEffect, useState } from "react";
import { IntlProvider, FormattedNumber, FormattedDate, FormattedTime, FormattedTimeParts } from "react-intl";
import { FiCheck } from 'react-icons/fi';
import api from '../services/api';

import styles from "../styles/pages/Cashier.module.css";

export default function Cashier() {
  const [ previousCash, setPreviousCash ] = useState(0);
  const [cash, setCash] = useState(0);
  const [actions, setActions ] = useState([]);
  const [ isCashOpen, setIsCashOpen ] = useState(false);
  const [isEditingCash, setIsEditingCash] = useState(false);

  async function loadCashier() {
    const response = await api.get('/cashier');
    const actionsResponse = await api.get('/actions');

    console.log(response.data);
    setCash(response.data.value);
    setActions(actionsResponse.data);
    setIsCashOpen(response.data.isOpen);
  }

  useEffect(() => {
    loadCashier();
  }, [])

  function handleEdit() {
    if(!isCashOpen) return alert('Abra o caixa antes de editar o valor');
    setPreviousCash(cash);
    setIsEditingCash(true);
  }

  async function handleChangeCash() {
    if(cash == previousCash) {
      setIsEditingCash(false);
      return;
    }
    const response = await api.post('/cashier', {
      value: cash,
      is_open: true,
      message: `Alterou o caixa no valor de ${previousCash} para ${cash}`
    })

    console.log(response.data);
    setIsEditingCash(false);
    loadCashier();
  }

  async function openCashier() {
    await api.post('/cashier', {
      value: cash,
      is_open: true,
      message: `Abriu caixa com o valor ${cash}`
    })

    setIsCashOpen(true);
    loadCashier();
  }
  
  async function closeCashier() {
    const response = await api.post('/cashier', {
      value: cash,
      is_open: false,
      message: `Fechou caixa com o valor ${cash}`
    })

    setIsCashOpen(false);
    loadCashier();
  }

  return (
    <IntlProvider locale="pt">
      <div className={styles.container}>
        <div className={styles.actions}>
          <h3>{<FormattedDate value={Date.now()} />}</h3>
          {actions.length && actions.map(item => (
            <span>
              {item.description}

              <p>
              <FormattedTime value={item.createdAt} />
              </p>
            </span>
          ))}
        </div>
        <div className={styles.cashier}>
        <h1>Caixa {isCashOpen ? 'aberto' : 'fechado'} </h1>
        {isEditingCash ? (
          <div className={styles.inputBox}>
            <input value={cash} onChange={event => setCash(event.target.value)} />
            <button onClick={handleChangeCash} >
              <FiCheck size={35} color="#FFF" />
            </button>
          </div>
        ) : (
          <h2 onClick={handleEdit}>
            <FormattedNumber value={cash} style="currency" currency="BRL" />
          </h2>
        )}

        { isCashOpen ? <button onClick={closeCashier} className={styles.close} >Fechar caixa</button> : <button onClick={openCashier} className={styles.open}>Abrir caixa</button>}
        </div>
      </div>
    </IntlProvider>
  );
}
