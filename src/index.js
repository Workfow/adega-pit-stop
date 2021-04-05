import React from "react";
import ReactDOM from "react-dom";
import Router from "./routes";
import { SalesProvider } from "./contexts/SalesContext";

import "./styles/global.css";

ReactDOM.render(
  <React.StrictMode>
    <SalesProvider>
      <Router />
    </SalesProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
