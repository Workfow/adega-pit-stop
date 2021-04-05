import { useEffect, useState, useContext } from "react";
import { FiPlus, FiTrash, FiX } from "react-icons/fi";
import { FormattedNumber, IntlProvider } from "react-intl";
import api from "../services/api";
import socket from "../services/socket";
import Select from "react-select";
import Search from "../components/Search";
import styles from "../styles/pages/Inventory.module.css";

import { InventoryContext } from "../contexts/InventoryContext";
import noImage from "../uploads/images/noImage.png";

export default function Estoque() {
  const {
    loadProducts,
    products,
    setProducts,
    handleToggleModal,
    justCloseModal,
    handleToggleDeleteModal,
    updateData,
    setIsUpdating,
    submitForm,
    submitUpdateForm,
    isSearching,
    searchResult,
    handleStopSearch
  } = useContext(InventoryContext);
  const [options, setOptions] = useState([]);
  const [ selectedValue, setSelectedValue ] = useState(null);

  async function loadProductsByCategory() {
    const response = await api.get(`/products/category/${selectedValue?.value}`)

    setProducts(response.data);
  }

  async function handleClearSelect() {
    setSelectedValue(null);
    loadProducts();
  }

  useEffect(() => {
    loadProductsByCategory();
  }, [selectedValue])

  useEffect(() => {
    socket.on("toggle_inventory_modal", () => {
      handleToggleModal();
    });
  }, []);

  useEffect(() => {
    socket.on("cancel_register", () => {
      justCloseModal();
    });
  }, []);

  useEffect(() => {
    loadProducts();
  }, []);

  function toggleModal() {
    setIsUpdating(false);
    handleToggleModal();
  }

  async function loadCategories() {
    const response = await api.get("/categories");

    const loadedCategories = response.data;

    const categoryOptions = loadedCategories.map((item) => {
      return {
        value: item.id,
        label: item.name,
      };
    });

    setOptions(categoryOptions);
  }

  useEffect(() => {
    loadCategories();
  }, []);

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#585191" : "#FFFFFF",
    }),
    control: (provided, state) => ({
      minHeight: 46,
      width: 300,
      border: state.isFocused ? "2px solid #585191" : "2px solid #c1c1c1",
      borderRadius: 8,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "all .3s",
    }),
    dropdownIndicator: (provided, state) => ({
      width: "2.3rem",
    }),
    clearIndicator: (provided, state) => ({
      position: "absolute",
      right: 0,
      bottom: "2.3rem",
    }),
  };

  return (
    <>
      <div className={styles.container}>
        <h2>Estoque</h2>

        {isSearching ? (
          <>
            {!searchResult.length ? (
              <>
              <h2>Nenhum resultado encontrado</h2>
              <button onClick={handleStopSearch} className={styles.okButton}>Ok</button>
              </>
            ) : (
              <>
                <Search />
                <div className={styles.cardsContainer}>
                  {searchResult.map((item) => (
                    <div onClick={() => updateData(item)} key={item.id}>
                      <FiTrash
                        onClick={() => handleToggleDeleteModal(item)}
                        className={`${styles.invisible} ${styles.delete}`}
                        size={20}
                      />
                      <img
                        src={
                          item.icon
                            ? `http://localhost:3333/icon?icon=${item.icon}`
                            : noImage
                        }
                        alt={item.icon}
                        className={item.icon ? styles.icon : styles.noImage}
                      />
                      <strong>{item.name}</strong>
                      <IntlProvider locale="pt">
                        <span className={styles.value}>
                          <FormattedNumber
                            value={item.price}
                            style="currency"
                            currency="BRL"
                          />
                        </span>
                      </IntlProvider>

                      <span>{item.amount} und</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <>
            {!products.length ? (
              <h2>Nenhum produto cadastrado ainda</h2>
            ) : (
              <>
                <div className={styles.searchContainer}>
                  <div>
                    <Select styles={customStyles} options={options} value={selectedValue} onChange={selectedOption => setSelectedValue(selectedOption)} />
                    { selectedValue && <FiX size={25} onClick={handleClearSelect} />}
                  </div>
                  <Search />
                </div>
                <div className={styles.cardsContainer}>
                  {products.map((item) => (
                    <div onClick={() => updateData(item)} key={item.id}>
                      <FiTrash
                        onClick={() => handleToggleDeleteModal(item)}
                        className={`${styles.invisible} ${styles.delete}`}
                        size={20}
                      />
                      <img
                        src={
                          item.icon
                            ? `http://localhost:3333/icon?icon=${item.icon}`
                            : noImage
                        }
                        alt={item.icon}
                        className={item.icon ? styles.icon : styles.noImage}
                      />
                      <strong>{item.name}</strong>
                      <IntlProvider locale="pt">
                        <span className={styles.value}>
                          <FormattedNumber
                            value={item.price}
                            style="currency"
                            currency="BRL"
                          />
                        </span>
                      </IntlProvider>

                      <span>{item.amount} und</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
      <button className={styles.addButton} type="button" onClick={toggleModal}>
        <FiPlus size={35} />
      </button>
    </>
  );
}
