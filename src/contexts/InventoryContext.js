import { createContext, useState } from "react";

import InventoryModal from "../components/InventoryModal";
import DeleteModal from '../components/DeleteModal';
import api from "../services/api";

export const InventoryContext = createContext();

export function InventoryProvider({ children }) {
  const [isInventoryModalOpen, setIsInventoryModalOpen] = useState(false);
  const [ isDeleteModalOpen, setIsDeleteModalOpen ] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentData, setCurrentData] = useState({});
  const [ deleteData, setDeleteData ] = useState({});

  function handleToggleModal() {
    if (isInventoryModalOpen) {
      setIsInventoryModalOpen(false);
      setCurrentData({});
    } else {
      setIsInventoryModalOpen(true);
    }
  }

  function handleToggleDeleteModal(data) {
    setDeleteData(data);

    if(isDeleteModalOpen) {
      setIsDeleteModalOpen(false);
    } else {
      setIsDeleteModalOpen(true);
    }
  }

  async function submitForm(data) {
    const formData = new FormData();

    formData.append("icon", data.icon);
    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("amount", data.amount);

    const response = await api.post("/products", formData, {
      headers: {
        "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
      },
    });
  }

  async function updateData(data) {
    setIsUpdating(true);
    setCurrentData(data);
    handleToggleModal();
  }

  async function submitUpdateForm(data) {
    const formData = new FormData();

    formData.append("icon", data.icon);
    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("amount", data.amount);

    api.put(`/products/${currentData.id}`, formData, {
      headers: {
        "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
      },
    }).then((response) => alert(response.data.message))

    

    handleToggleModal();
  }

  return (
    <InventoryContext.Provider
      value={{
        handleToggleModal,
        handleToggleDeleteModal,
        submitForm,
        updateData,
        currentData,
        setIsUpdating,
        submitUpdateForm,
        deleteData
      }}
    >
      {children}
      {isInventoryModalOpen && <InventoryModal update={isUpdating} />}
      {isDeleteModalOpen && <DeleteModal/>}
    </InventoryContext.Provider>
  );
}
