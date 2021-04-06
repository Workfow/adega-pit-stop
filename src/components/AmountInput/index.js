import { useState, useContext, useEffect } from 'react';
import { SalesContext } from '../../contexts/SalesContext';
import { FinancialContext } from '../../contexts/FinancialContext';
import socket from '../../services/socket';

import styles from '../../styles/components/AmountInput.module.css';

export default function AmountInput({ currentItem, purchase }) {
  const { changeAmount } = useContext(SalesContext);
  const { changeProductAmount } = useContext(FinancialContext);
  const [ amount, setAmount ] = useState(1);

  useEffect(() => {
    if(purchase) {
      changeProductAmount(currentItem, amount);
    } else {
      changeAmount(currentItem, amount);
    }
  }, [amount])

  return (
    <input className={styles.amountInput} onFocus={event => event.target.select()} onClick={event => event.target.select()} type="number" maxlength="4" autoFocus={true} value={amount} onChange={event => setAmount(event.target.value)} />
  )
}