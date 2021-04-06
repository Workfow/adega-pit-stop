import { createContext, useEffect, useState } from "react";

import PdfModal from "../components/PdfModal";
import PurchaseModal from "../components/PurchaseModal";
import DeletePurchaseModal from "../components/DeletePurchaseModal";
import api from "../services/api";

export const FinancialContext = createContext();

export function FinancialProvider({ children }) {
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [isDeletePurchaseModalOpen, setIsDeletePurchaseModalOpen] = useState(
    false
  );
  const [deleteData, setDeleteData] = useState({});
  const [pdfUrl, setPdfUrl] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [products, setProducts] = useState([]);

  function handleTogglePdfModal(pdf) {
    if (isPdfModalOpen) {
      setIsPdfModalOpen(false);
    } else {
      setPdfUrl(pdf);
      setIsPdfModalOpen(true);
    }
  }

  function handleTogglePurchaseModal() {
    if (isPurchaseModalOpen) {
      setIsPurchaseModalOpen(false);
    } else {
      setIsPurchaseModalOpen(true);
    }
  }

  function handleToggleDeletePurchaseModal(data) {
    if (isDeletePurchaseModalOpen) {
      setIsDeletePurchaseModalOpen(false);
    } else {
      setDeleteData(data);
      setIsDeletePurchaseModalOpen(true);
    }
  }

  function changeProductAmount(product, amount) {
    let currentProduct = selectedProducts.filter((item) => {
      return item.value === product.value;
    });

    const currentProductIndex = selectedProducts.indexOf(currentProduct[0]);

    const newProduct = 
      {
        value: currentProduct[0].value,
        label: currentProduct[0].label,
        amount: Number(amount)
      }
    

    let newProducts = products;

    newProducts[currentProductIndex] = newProduct;

    setProducts([...newProducts]);
  }

  async function submitForm(data, formCost) {
    const formData = new FormData();

    const productsObj = JSON.stringify(products);

    console.log(formCost)

    const costResponse = await api.put(`/products/${formCost.costItem.value}`, {
      cost: Number(formCost.cost)
    })

    formData.append("invoice", data.invoice);
    formData.append("description", data.description);
    formData.append("value", data.value);
    formData.append("products", productsObj);

    const response = await api.post("/purchases", formData, {
      headers: {
        "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
      },
    });

    alert("Compra cadastrada");
    handleTogglePurchaseModal();
  }

  async function updatePurchase(data) {
    const formData = new FormData();

    formData.append("invoice", data.invoice);

    await api.put(`/purchases/${deleteData.id}`, formData, {
      headers: {
        "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
      },
    });
    handleTogglePdfModal();

    alert("Pdf enviado");
  }

  async function handleDeletePurchases(id) {
    const response = await api.delete(`/purchases/${id}`);

    alert("Compra Removida");
    handleToggleDeletePurchaseModal();
  }

  return (
    <FinancialContext.Provider
      value={{
        handleTogglePdfModal,
        handleTogglePurchaseModal,
        submitForm,
        pdfUrl,
        handleToggleDeletePurchaseModal,
        deleteData,
        handleDeletePurchases,
        updatePurchase,
        changeProductAmount,
        selectedProducts,
        setSelectedProducts,
      }}
    >
      {children}
      {isPdfModalOpen && <PdfModal />}
      {isDeletePurchaseModalOpen && <DeletePurchaseModal />}
      {isPurchaseModalOpen && <PurchaseModal />}
    </FinancialContext.Provider>
  );
}
