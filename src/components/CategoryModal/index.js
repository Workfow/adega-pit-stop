import { Form } from '@unform/web';
import { FiX } from 'react-icons/fi';
import Input from '../Input';
import Button from '../Button';
import api from '../../services/api';
import styles from '../../styles/components/CategoryModal.module.css';
import { useRef } from 'react';

export default function CategoryModal({ setIsModalOpen, loadCategories }) {
  const formRef = useRef(null);

  async function handleSubmit(data, {reset}) {
    const response = await api.post('/categories', data);

    loadCategories();
    reset()
    setIsModalOpen(false);
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
      <button onClick={() => setIsModalOpen(false)}>
          <FiX size={20} />
        </button>
        <h2>Adicionar categoria</h2>
        <Form formRef="formRef" onSubmit={handleSubmit} >
          <Input name="name" placeholder="Nome" />
          <Button type="submit">
            Cadastrar
          </Button>
        </Form>
      </div>
    </div>
  )
}