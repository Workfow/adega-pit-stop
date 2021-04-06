import styles from '../../styles/components/CostInput.module.css';

export default function CostInput({ ...rest }) {

  return (
    <input {...rest} className={styles.input} />
  )
}