import "./style-main-caixa-bomba.css";
import bomba from "../../../public/image/motor.png";
import raioligado from "../../../public/image/raio-ligado.png";
import mqtt from "mqtt";
import { useState } from "react";

export default function ControleBomda({ cliente, status, stado_motor, setStado }) {

  function ligarMotor() {
    if (cliente.on) {
      if (stado_motor == "1") {
        cliente.publish('s/sensor/MOTOR', "0")
        console.log("s/sensor/MOTOR desligado")
        setStado("0")
      } else {
        cliente.publish('s/sensor/MOTOR', "1")
        console.log("s/sensor/MOTOR ligado")
        setStado("1")
      }
    }
  }

  return (
    <div className="controleBomba">
      <div className="controle">
        <div className="controleBtn">
          <label htmlFor="btnMotor" className="toogle">
            <h1>Desligar/Ligar:</h1>
            <div className="btn">
              <input type="checkbox" id="btnMotor" checked={stado_motor === "1"} onChange={(e) => ligarMotor()} />
              <div className="circulo" />
            </div>
          </label>
        </div>
        <div className="statusMotor">
          <h1>Status:</h1>
          <div className="controleStatusMotor">
            <div className={status === "1" ? "bombaLigar_ativado" : "bombaLigar"}></div>
            <div className={status === "1" ? "bombaDesligar" : "bombaDesligar_ativado"}></div>
          </div>
        </div>
      </div>
      <div className="conteinerBomba">
        <img src={raioligado} className={status === "1" ? "blink" : "imgRaio"} />
        <img src={bomba} className="imgBomba" />
      </div>
    </div>
  );
}
