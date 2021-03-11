import { useRef, useEffect } from 'react';
import { useField } from '@unform/core';
import styles from '../../styles/components/Input.module.css';

export default function Input({name, type, placeholder, ...rest}) {
  const inputRef = useRef(null);
  const { fieldName, defaultValue, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: ref => {
        return ref.current.value
      },
      setValue: (ref, value) => {
        ref.current.value = value
      },
      clearValue: ref => {
        ref.current.value = ''
      },
    })
  }, [fieldName, registerField])

  return (
    <div className={styles.inputBox}>
      <input id={name} ref={inputRef} type={type} placeholder=" " {...rest} />
      <label className={styles.placeholder} htmlFor={name}>{placeholder}</label>
    </div>
  );
}
