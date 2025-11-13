import { useState } from "react";
import "./style-relatorio.css";

export default function Relatorio({logs}) {

  return (
    <div className="conteiner-relatorio">
      <h1>Relatorio</h1>
      <div className="caixaRelatorio">
        {logs.map((log, index) => (
          <p key={index}>{log}</p>
        ))}
      </div>
    </div>
  );
}
