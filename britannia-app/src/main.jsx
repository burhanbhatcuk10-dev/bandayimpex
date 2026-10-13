import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { DataProvider } from "./DataContext";
import { ShopProvider } from "./ShopContext";
import "./branding.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <DataProvider>
        <ShopProvider>
          <App />
        </ShopProvider>
      </DataProvider>
    </BrowserRouter>
  </React.StrictMode>
);
