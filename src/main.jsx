import { createRoot } from "react-dom/client";
import { StrictMode } from "react";

import "./index.css";
import AppRouter from "./router/appRouter";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppRouter />
  </StrictMode>
);
