import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StrictMode } from "react";

import App from "../page/App";
import PaginaLogin from "../page/Login";

export default function AppRouter() {
  return (
    <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<PaginaLogin />} />
          <Route path="/" element={<App />} />
        </Routes>
      </BrowserRouter>
    </StrictMode>
  );
}
