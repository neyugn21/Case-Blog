import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { InfoProvider } from "./Context/InfoContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StrictMode>
      {/* <App /> */}
      <InfoProvider>
        <App />
      </InfoProvider>
    </StrictMode>
  </BrowserRouter>
);
