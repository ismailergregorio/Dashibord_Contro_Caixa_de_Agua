import "./style-main-caixa-bomba.css";
import bomba from "../../../public/image/motor.png";
import raioligado from "../../../public/image/raio-ligado.png";
import mqtt from "mqtt";
import { useState } from "react";

export default function ControleBomda() {
  const [stado_motor, setStadoMotor] = useState("");

  const url = 'ws://192.168.100.5:8080'

  // Create an MQTT client instance
  const options = {
    // Clean session
    clean: true,
    connectTimeout: 4000,
    // Authentication
    clientId: 'client_' + Math.random().toString(16).substr(2, 8),
    username: 'meuuser',
    password: '1234',
  }
  const client = mqtt.connect(url, options);

  client.on("connect", function () {
    console.log("✅ Conectado ao broker");
    client.subscribe("sensor/MOTOR", function (err) {
    });
  });

  client.on("message", function (topic, message) {
    setStadoMotor(message.toString());
    console.log(stado_motor);
  });

  function ligarMotor(){
    if(client.on){
    client.publish('sensor/MOTOR', `${stado_motor === "1"? "1":"0"}`)
    setStadoMotor(!stado_motor)}
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
            <div className="bombaLigar" />
            <div className="bombaDesligar" />
          </div>
        </div>
      </div>
      <div className="conteinerBomba">
        <img src={raioligado} className="imgRaio" />
        <img src={bomba} className="imgBomba" />
      </div>
    </div>
  );
}
