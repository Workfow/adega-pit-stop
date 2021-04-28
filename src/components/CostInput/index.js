import { useEffect, useState, useContext } from 'react';
import { FinancialContext } from '../../contexts/FinancialContext';
import styles from '../../styles/components/CostInput.module.css';

export default function CostInput({ currentItem ,...rest }) {
  const { changeCost } = useContext(FinancialContext);
  const [ cost, setCost ] = useState();

  useEffect(() => {
    changeCost(currentItem, cost);
  }, [cost])

  return (
    <input {...rest} className={styles.input} value={cost} onChange={event => setCost(event.target.value)} />
  )
}