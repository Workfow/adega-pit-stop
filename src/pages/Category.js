import { useEffect, useState } from 'react';
import { FiPlus, FiTrash } from 'react-icons/fi';
import CategoryModal from '../components/CategoryModal';
import api from '../services/api';
import styles from '../styles/pages/Category.module.css';

export default function Category() {
  const [ categories, setCategories ] = useState([]);
  const [ isModalOpen, setIsModalOpen ] = useState(false);

  async function loadCategories() {
    const response = await api.get('/categories');

    setCategories(response.data);
  }

  useEffect(() => {
    loadCategories();
  }, [])

   function handleDelete(item) {
    api.delete(`/categories/${item.id}`)
      .then(() => {
        alert(`${item.name} removido`)
        loadCategories();
      })

    loadCategories();
  }
  
  return (
    <div className={styles.container}>
      <h2>Categorias cadastradas</h2>

      <button className={styles.addButton} type="button" onClick={() => setIsModalOpen(true)}>
        <FiPlus size={35} />
      </button>

      <ul className={styles.categories} >
        { categories.map(item => (
          <li key={item.id} >
            {item.name}
            <FiTrash size={30} onClick={() => handleDelete(item)} />
          </li>
        ))}
      </ul>

      { isModalOpen && <CategoryModal setIsModalOpen={setIsModalOpen} loadCategories={loadCategories} />}
    </div>
  )
}