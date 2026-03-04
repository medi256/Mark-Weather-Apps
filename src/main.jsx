import React from "react";
import ReactDOM from "react-dom/client";
import "./Components/UI/UI.css";
import "./index.css";
import App from "./App.jsx";
import { AppProvider } from "./Context/AppContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>,
);
