import { createContext, useState, useEffect } from "react";

import InventoryModal from "../components/InventoryModal";
import DeleteModal from '../components/DeleteProductModal';
import api from "../services/api";

export const InventoryContext = createContext();

export function InventoryProvider({ children }) {
  const [ products, setProducts ] = useState([]);
  const [isInventoryModalOpen, setIsInventoryModalOpen] = useState(false);
  const [ isDeleteModalOpen, setIsDeleteModalOpen ] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentData, setCurrentData] = useState({});
  const [ deleteData, setDeleteData ] = useState({});
  const [ isSearching, setIsSearching ] = useState(false);
  const [ searchData, setSearchData ] = useState('');
  const [ searchResult, setSearchResult ] = useState([]);

  async function loadProducts() {
    const response = await api.get("/products");

    setProducts(response.data);
  }

  function handleToggleModal() {
    if (isInventoryModalOpen) {
      setIsInventoryModalOpen(false);
      setCurrentData({});
      loadProducts();
    } else {
      setIsInventoryModalOpen(true);
    }
  }

  function justCloseModal() {
    setIsInventoryModalOpen(false);
  }

  function handleToggleDeleteModal(data) {
    setDeleteData(data);

    if(isDeleteModalOpen) {
      setIsDeleteModalOpen(false);
    } else {
      setIsDeleteModalOpen(true);
    }
  }

  async function submitForm(data, selectedValue) {
    const formData = new FormData();

    formData.append("icon", data.icon);
    formData.append('barcode', data.barcode);
    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("amount", data.amount);
    formData.append("category_id", selectedValue.value);
    
    const response = await api.post("/products", formData, {
      headers: {
        "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
      },
    });

    loadProducts();
  }

  async function updateData(data) {
    setIsUpdating(true);
    setCurrentData(data);
    handleToggleModal();
  }

  async function submitUpdateForm(data, selectedValue) {
    const formData = new FormData();

    formData.append("icon", data.icon);
    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("amount", data.amount);
    formData.append("category_id", selectedValue.value);

    api.put(`/products/${currentData.id}`, formData, {
      headers: {
        "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
      },
    }).then(alert('Produto atualizado com sucesso'))

    loadProducts();
    handleToggleModal();
  }

  function handleSearch() {
    if(!searchData) {
      alert('É necessário digitar algo no campo de busca')
      return;
    }

    setIsSearching(true);

    const filtered = products.filter(value => {
      return value.name.toLowerCase().includes(searchData.toLowerCase());
    })

    setSearchResult(filtered);
  }

  function handleStopSearch() {
    setSearchData('');
    setIsSearching(false);
  }

  return (
    <InventoryContext.Provider
      value={{
        loadProducts,
        products,
        setProducts,
        handleToggleModal,
        handleToggleDeleteModal,
        submitForm,
        updateData,
        currentData,
        setIsUpdating,
        submitUpdateForm,
        deleteData,
        handleSearch,
        handleStopSearch,
        isSearching, 
        setIsSearching,
        searchData, 
        setSearchData,
        searchResult,
        justCloseModal
      }}
    >
      {children}
      {isInventoryModalOpen && <InventoryModal update={isUpdating} />}
      {isDeleteModalOpen && <DeleteModal/>}
    </InventoryContext.Provider>
  );
}
