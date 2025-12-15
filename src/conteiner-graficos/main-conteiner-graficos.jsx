import "./style-conteine-grafico.css";
import Grafico from "../components/grafico-controle/grafico";
import { useEffect, useState, useRef } from "react";
import mqtt from "mqtt";
import axios from 'axios'
export default function ConteinerGrafico() {

  const getDadosCaixaStado = "http://192.168.100.5:8081/api/caixa/ultimo-caixa";
  const getDadosMotoStado = "http://192.168.100.5:8081/api/motor/get";

  //receber dados
  const estadoCaixa = "estado/caixa";
  const estadoBtnMotorDoEspMQTT = "estadoBtn/esp/motor";

  //solicitação
  const estadoBtnMotorDoSite = "estadoBtn/site/motor";
  const estadoCaixaDoSite = "estado/site/caixa";

  //dados de controle
  const [dadoAtualCaixa, setDadoAtualCaixa] = useState("");
  const [dadoAtualMotor, setDadoAtualCMotor] = useState("");

  const [dadosCaixa, setDadosCaixa] = useState([]);
  const [dadosMotor, setDadosMotor] = useState([]);


  const agora = new Date();
  const dataFormatada = agora.toISOString(); // 2025-10-31T22:15:00.000Z
  const clientRefa = useRef(null);
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
      getDadosCaixa();
      console.log("✅ Conectado ao broker");
      client.subscribe(estadoBtnMotorDoEspMQTT, function (err) {
      });
      client.subscribe(estadoCaixa, function (err) {
      });

      if (clientRefa) {
        client.publish(estadoBtnMotorDoSite, "true");
        client.publish(estadoCaixaDoSite, "true")
        clientRefa.current = client;
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
    setLogst((prevLogs) => [
      ...prevLogs,
      `${topic.toString()}: ${message.toString()} (${dataFormatada})`
    ]);

    // --- Valores da caixa de água (Vasio, Metade, Cheio) ---
    if (topic === estadoCaixa) {

      let valor = 0;  // AGORA pode ser alterada

      const texto = message.toString();

      if (texto === "Vasio") {
        console.log("Estado = 1");
        valor = 1;
      } else if (texto === "Metade") {
        console.log("Estado = 2");
        valor = 2;
      } else if (texto === "Cheio") {
        console.log("Estado = 3");
        valor = 3;
      }
      setDadoAtualCaixa(valor);
    }

    // --- Dados do motor ---
    if (topic === estadoBtnMotorDoEspMQTT) {
      setDadoAtualCMotor(Number(message.toString()));
    }
  });

  const getDadosCaixa = () => {
    try {
      axios.get(getDadosCaixaStado).then((res) => {
        setDadosCaixa(res.data);
        console.log(res.data);
      })
    } catch {
      (err) => {
        console.error(err, "erro na busca")
      }
    }
  }

  const getDadosMotor = () => {
    try {
      axios.get(getDadosMotoStado).then((res) => {
        setDadosMotor(res.data);
        console.log(res.data);
      })
    } catch {
      (err) => {
        console.error(err, "erro na busca")
      }
    }
  }

  useEffect(() => {
    if (dadoAtualCaixa !== "") {
      getDadosCaixa();
    }
  }, [dadoAtualCaixa]);

  useEffect(() => {
    if (dadoAtualMotor !== "") {
      getDadosMotor();
    }
  }, [dadoAtualMotor]);

  return (
    <div className="continenta_grafico">
      {/* Só renderiza quando os dados existirem */}
      {dadosCaixa ? (
        <Grafico titulo={"Dados Caixa"} dados={dadosCaixa.slice(-50)} valorAtual={Number(dadoAtualCaixa)} />
      ) : (
        <p>Carregando dados...</p>
      )}

      {dadosMotor ? (
        <Grafico titulo={"Dados Motor"} dados={dadosMotor.slice(-50)} valorAtual={Number(dadoAtualMotor)} />
      ) : (
        <p>Carregando dados...</p>
      )}
    </div>
  );
}
