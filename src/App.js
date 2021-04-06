import { useEffect, useState, useContext } from "react";
import api from './services/api';
import socket from './services/socket';
import { Link } from "react-router-dom";
import { InventoryContext } from './contexts/InventoryContext';
import "./app.css";

function App() {
  const { handleToggleModal } = useContext(InventoryContext);
  const [ recentProducts, setRecentProducts ] = useState([]);
  const [ recentPurchases, setRecentPurchases ] = useState([]);

  async function loadRecent() {
    const product = await api.get('/products-recent');
    const purchase = await api.get('/purchases-recent');

    setRecentProducts(product.data);
    setRecentPurchases(purchase.data);
  }

  useEffect(() => {
    loadRecent()
  }, [])

  useEffect(() => {
    socket.on('toggle_inventory_modal', () => {
      handleToggleModal();
    })
  }, [])

  return (
    <div className="container">
      <h2>O que gostaria de fazer :</h2>
      <div className="box-container">
        <Link to="/inventoryDash">
          <section>
            <h2>Estoque</h2>

            <div className="list">
              {recentProducts.map((item) => (
                <span key={item.id}>{item.name}</span>
              ))}              
            </div>

            <footer>
              <p>Clique para ver o estoque</p>
            </footer>
          </section>
        </Link>

        <Link to="/financial">
          <section>
            <h2>Financeiro</h2>

            <div className="list">
              {recentPurchases.map(item => (
                <span key={item.id}>{item.description}</span>
              ))}
            </div>

            <footer>
              <p>Clique para ver suas finanças</p>
            </footer>
          </section>
        </Link>
      </div>
    </div>
  );
}

export default App;
