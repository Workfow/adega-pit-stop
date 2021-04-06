import React from "react";
import ReactDOM from "react-dom";
import Router from "./routes";
import { InventoryProvider } from "./contexts/InventoryContext";
import { SalesProvider } from "./contexts/SalesContext";
import { FinancialProvider } from "./contexts/FinancialContext";

import "./styles/global.css";

ReactDOM.render(
  <React.StrictMode>
    <InventoryProvider>
      <FinancialProvider>
        <SalesProvider>
          <Router />
        </SalesProvider>
      </FinancialProvider>
    </InventoryProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
