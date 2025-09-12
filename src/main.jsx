import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Hader from "./hader/hader";
import MainControle from "./d-controle/main-controle";
import ConteinerSensor from "./conteiner-sersores/main-conteiner-sensores";
import ConteinerGrafico from "./conteiner-graficos/main-conteiner-graficos";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <main>
      <Hader />
      <div className="dashibord">
        <div className="d-controle">
          <MainControle />
        </div>
        <div className="graficos-sensores">
          <ConteinerSensor />
        </div>
        <div className="graficos-caixas">
          <ConteinerGrafico />
        </div>
      </div>
    </main>
  </StrictMode>
);
