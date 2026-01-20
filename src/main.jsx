import { createRoot } from "react-dom/client";
import { StrictMode } from "react";

import "./index.css";
import AppRouter from "./router/appRouter";
import { ToastContainer, toast } from 'react-toastify';

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppRouter />
    <ToastContainer />
  </StrictMode>
);
