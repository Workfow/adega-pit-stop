import { createContext, useState, useEffect } from "react";
import SaleModal, { SaleModalButton } from "../components/SaleModal";
import SalePreviewModal from '../components/SalePreviewModal';
import api from "../services/api";
import socket from "../services/socket";

export const SalesContext = createContext({});

export function SalesProvider({ children }) {
  const [isSaleModalOpen, setIsSaleModalOpen] = useState(false);
  const [isSaleModalActive, setIsSaleModalActive] = useState(false);
  const [ isSalePreviewModalOpen, setIsSalePreviewModalOpen] = useState(false);
  const [ currentItemPreview, setCurrentItemPreview ] = useState({});
  const [ sales, setSales ] = useState([]);
  const [ salesTotalValue, setSalesTotalValue] = useState(0);
  const [products, setProducts] = useState([]);
  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    socket.on("scanned_products", (data) => {
      const filtered = data.filter((el) => {
        return el != null;
      });

      const filteredNumbers = filtered.map((item) => {
        return item.price;
      });

      getTotalValue(filteredNumbers);

      setProducts(filtered);
    });
  }, []);

  function getTotalValue(filteredNumbers) {
    if (filteredNumbers.length) {
      const values = filteredNumbers.reduce((acc, cur) => acc + cur);
      setTotalValue(values);
    }
  }


  function changeAmount(barcode, amount) {
    const currentProduct = products.filter(value => {
      return value.barcode.includes(barcode);
    })

    const currentPrice = currentProduct[0]?.originalPrice ? currentProduct[0]?.originalPrice : currentProduct[0]?.price;

    const oldProductIndex =  products.indexOf(currentProduct[0]);

    const newPrice = currentPrice * amount;

    const newProduct = currentProduct.map(item => {
      return {
        id: item.id,
        icon: item.icon,
        barcode: item.barcode,
        name: item.name,
        originalPrice: item.originalPrice ? item.originalPrice : item.price,
        price: newPrice === 0 ? item.originalPrice : newPrice,
        amount
      }
    })

    let newProducts = products;

    newProducts[oldProductIndex] = newProduct[0];

    const filteredNumbers = newProducts.map(item => {
      return item.price
    });

    setProducts(newProducts);
    getTotalValue(filteredNumbers);

  }

  function handleToggleSaleModal() {
    if (isSaleModalOpen) {
      setIsSaleModalOpen(false);
    } else {
      setIsSaleModalOpen(true);
    }
  }

  function closeSaleModal() {
    socket.emit("finish_sale");
    setProducts([]);
    setTotalValue(0);
    setIsSaleModalActive(false);
    handleToggleSaleModal();
  }

  async function finishSale() {
    const description = products.map((item) => {
      return item.name;
    });

    const sendProducts = products.map(item => {
      return {
        id: item.id,
      amount: Number(item.amount)
      }
    })

    const response = await api.post("/sales", {
      description,
      value: totalValue,
      products: sendProducts
    });

    alert("Venda Finalizada");
    
    socket.emit('finish_sale')

    closeSaleModal();
  }

  function handleToggleSalePreviewModal(item) {
    if(isSalePreviewModalOpen) {
      setIsSalePreviewModalOpen(false);
      setCurrentItemPreview({});
    } else {
      setIsSalePreviewModalOpen(true);
      setCurrentItemPreview(item);
    }
  }

  async function loadSales() {
    const response = await api.get("/sales");

    setSales(response.data.sales);
    setSalesTotalValue(response.data.totalValue)
  }

  function handleDeleteSale() {
    api.delete(`/sales/${currentItemPreview.id}`)
      .then(response => alert(response.data.message));

    handleToggleSalePreviewModal();
    loadSales();
  }

  return (
    <SalesContext.Provider
      value={{
        handleToggleSaleModal,
        closeSaleModal,
        setIsSaleModalActive,
        products,
        setProducts,
        setTotalValue,
        totalValue,
        finishSale,
        changeAmount,
        handleToggleSalePreviewModal,
        currentItemPreview,
        handleDeleteSale,
        loadSales,
        sales,
        salesTotalValue
      }}
    >
      {children}
      {isSaleModalOpen && <SaleModal />}
      {isSaleModalActive && !isSaleModalOpen && <SaleModalButton />}
      {isSalePreviewModalOpen && <SalePreviewModal /> }
    </SalesContext.Provider>
  );
}
