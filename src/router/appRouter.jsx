import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StrictMode } from "react";

import App from "../page/App";
import RotaPrivada from "./RotaPrivada";
import PaginaLogin from "../page/Login";

export default function AppRouter() {
  return (
    <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PaginaLogin />} />
          <Route path="/app" element={<RotaPrivada><App /></RotaPrivada>} />
        </Routes>
      </BrowserRouter>
    </StrictMode>
  );
}
