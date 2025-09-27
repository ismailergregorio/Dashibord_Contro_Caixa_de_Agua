import { useState } from "react";
import "./style-status-sensor.css";
import mqtt from "mqtt";

export default function StatusSensor({ texto,stado}) {
  return (
    <div className="sensor">
      <div className="textStatus">
        <h1>Sensor:{texto}</h1>
        <h2>Status:{stado}</h2>
      </div>
      <div className="Sinalisacao">
        <div className={stado === "1" ? "ativo" : "ativo_off"}></div>
        <div className={stado === "1" ? "destivado_off" : "destivado"}></div>
      </div>
    </div>
  );
}
