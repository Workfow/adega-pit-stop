import { useRef, useEffect, useState } from 'react';
import { useField } from '@unform/core';
import styles from '../../styles/components/Input.module.css';

export default function Input({name, type, placeholder, ...rest}) {
  const inputRef = useRef(null);
  const [ newError, setNewError ] = useState('');
  const [ errorClass, setErrorClass ] = useState(styles.none);
  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    if(error?.startsWith('price must be a')) {
      setNewError('O preço deve ser informado')
    } else if(error?.startsWith('amount must be a')) {
      setNewError('A quantidade deve ser informada')
    } else if (error?.startsWith('value must be a ')) {
      setNewError('O valor deve ser informado')
    } else {
      setNewError(error);
    }

    if(error) {
      setErrorClass(styles.errorInput);
    } else {
      setErrorClass(styles.none);
    }
  }, [error])

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
      <input id={name} className={errorClass} ref={inputRef} type={type} placeholder=" " {...rest} />
      <label className={styles.placeholder} htmlFor={name}>{placeholder}</label>
      { error && <span>{newError}</span> }
    </div>
  );
}
