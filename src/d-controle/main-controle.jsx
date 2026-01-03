import "./style-main-controler.css";
import Relatorio from "./caixa-de-relatorio/relatorio";
import CaixaSensores from "./caixa-de-controle-sensores/main-caixa-sensores";
import ControleBomda from "./caixa-de-controle-bomba/main-caixa-bomba";
import CaixaConfig from "./caixa-config/main-caixa-config";
import { useState, useRef, useEffect } from "react";

export default function MainControle({mqttData}) {

  const [stadoMotor, setStadoMotor] = useState("0");
  const [statusMotor, setStatusMotor] = useState("0");

  return (
    <div className="main-controler">
      <Relatorio logs={mqttData.logs} />
      <div className="caixa_sensor_e_caixa_config">
        <CaixaSensores sensor1={mqttData.sensorNivelCaixa1} sensor2={mqttData.sensorNivelCaixa2} sensor3={mqttData.sensorNivelCaixa3} />
        <CaixaConfig />
      </div>
      <ControleBomda mqttData={mqttData} />
    </div>
  );
}
