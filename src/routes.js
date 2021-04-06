import { useEffect, useContext } from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import Header from "./components/Header";

import Home from "./App";
import Estoque from "./pages/Inventory";
import Financial from "./pages/Financial";
import Purchases from "./pages/Purchases";
import Sales from "./pages/Sales";
import InventoryDash from './pages/InventoryDash';
import Category from './pages/Category';
import Report from './pages/Report';

import socket from "./services/socket";

import { InventoryProvider } from "./contexts/InventoryContext";
import { FinancialProvider } from "./contexts/FinancialContext";
import { SalesContext } from "./contexts/SalesContext";

export default function Router() {
  const { handleToggleSaleModal } = useContext(SalesContext);

  useEffect(() => {
    socket.on("init_sale", () => {
      handleToggleSaleModal();
    });
  }, []);

  return (
    <HashRouter>
      <Header title="Recanto da Cerveja" />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/inventoryDash" component={InventoryDash} />
        <Route path="/inventory" component={Estoque} />
        <Route path="/category" component={Category} />
        <Route path="/financial" component={Financial} />
        <Route path="/purchases" component={Purchases} />
        <Route path="/sales" component={Sales} />
        <Route path="/report" component={Report} />
      </Switch>
    </HashRouter>
  );
}
