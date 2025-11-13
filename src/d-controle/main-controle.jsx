import "./style-main-controler.css";
import Relatorio from "./caixa-de-relatorio/relatorio";
import CaixaSensores from "./caixa-de-controle-sensores/main-caixa-sensores";
import ControleBomda from "./caixa-de-controle-bomba/main-caixa-bomba";
import CaixaConfig from "./caixa-config/main-caixa-config";
import mqtt from "mqtt";
import { useState, useRef, useEffect } from "react";

export default function MainControle() {
  const agora = new Date();
  const dataFormatada = agora.toISOString(); // 2025-10-31T22:15:00.000Z
  const clientRef = useRef(null);
  const [stado_sensor1, setStadoSensor1] = useState("");
  const [stado_sensor2, setStadoSensor2] = useState("");
  const [stado_sensor3, setStadoSensor3] = useState("");
  const [stadoMotor, setStadoMotor] = useState("");
  const [statusMotor, setStatusMotor] = useState("");
  const [loguis, setLogst] = useState([]);
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
  useEffect(() => {
    client.on("connect", function () {
      console.log("✅ Conectado ao broker");

      client.subscribe("sensor/SEN[1]", function (err) {
      });
      client.subscribe("sensor/SEN[2]", function (err) {
      });
      client.subscribe("sensor/SEN[3]", function (err) {
      });
      client.subscribe("sensor/MOTOR", function (err) {
      });
      client.subscribe("stado/MOTOR", function (err) {
      });

      if (clientRef) {
        client.publish("init/atulisar", "true");
        clientRef.current = client;
      }
    });
  }, [])

  client.on("message", function (topic, message) {
    setLogst((prevLogs) => [
      ...prevLogs,
      `${topic.toString()}: ${message.toString()} (${dataFormatada})`
    ]);
  });

  client.on("message", function (topic, message) {
    if (topic == "sensor/SEN[1]") {
      setStadoSensor1(message.toString());
      console.log(message.toString());
    }
  });
  client.on("message", function (topic, message) {
    if (topic == "sensor/SEN[2]") {
      setStadoSensor2(message.toString());
      console.log(message.toString());
    }
  });
  client.on("message", function (topic, message) {
    if (topic == "sensor/SEN[3]") {
      setStadoSensor3(message.toString());
      console.log(message.toString());
    }
  });

  client.on("message", function (topic, message) {
    if (topic == "sensor/MOTOR") {
      setStadoMotor(message.toString());
      console.log(topic, message);
    }
  });

  client.on("message", function (topic, message) {
    if (topic == "stado/MOTOR") {
      setStatusMotor(message.toString());
      console.log(topic, message);
    }
  });

  return (
    <div className="main-controler">
      <Relatorio logs={loguis} />
      <div className="caixa_sensor_e_caixa_config">
        <CaixaSensores sensor1={stado_sensor1} sensor2={stado_sensor2} sensor3={stado_sensor3} />
        <CaixaConfig />
      </div>
      <ControleBomda cliente={client} status={statusMotor} stado_motor={stadoMotor} setStado={setStadoMotor} />
    </div>
  );
}
