import "./style-conteine-grafico.css";
import Grafico from "../components/grafico-controle/grafico";
import { useEffect, useState, useRef } from "react";
import mqtt from "mqtt";
import axios from 'axios'
import api from "../services/api";
export default function ConteinerGrafico({mqttData}) {

  const getDadosCaixaStado = "http://192.168.100.46:8081/api/caixa/ultimo-caixa";
  const getDadosMotoStado = "http://192.168.100.46:8081/api/motor/get";

  const [dadosCaixa,setDadosCaixa] = useState([]);
  const [dadosMotor,setDadosMotor] = useState([]);


  // // --- Valores da caixa de água (Vasio, Metade, Cheio) ---
  // if (topic === mqttData.statusCaixa) {

  //   let valor = 0;  // AGORA pode ser alterada

  //   const texto = message.toString();

  //   if (texto === "Vasio") {

  //     valor = 1;
  //   } else if (texto === "Metade") {

  //     valor = 2;
  //   } else if (texto === "Cheio") {

  //     valor = 3;
  //   }
  // }


  const getDadosCaixa = () => {
    try {
      api.get(getDadosCaixaStado).then((res) => {
        setDadosCaixa(res.data);
      })
    } catch {
      (err) => {
        console.error(err, "erro na busca")
      }
    }
  }

  const getDadosMotor = () => {
    try {
      api.get(getDadosMotoStado).then((res) => {
        setDadosMotor(res.data);
      })
    } catch {
      (err) => {
        console.error(err, "erro na busca")
      }
    }
  }

  useEffect(() => {
    if (mqttData.statusCaixa !== "") {
      getDadosCaixa();
    }
  }, [mqttData.statusCaixa]);

  useEffect(() => {
    if (mqttData.statusMotor !== "") {
      getDadosMotor();
    }
  }, [mqttData.statusMotor]);

  useEffect(() => {
    getDadosCaixa();
    getDadosMotor();
  }, [])

  return (
    <div className="continenta_grafico">
      {/* Só renderiza quando os dados existirem */}
      {dadosCaixa ? (
        <Grafico titulo={"Dados Caixa"} dados={dadosCaixa.slice(-20)} valorAtual={Number(mqttData.statusCaixa)} />
      ) : (
        <p>Carregando dados...</p>
      )}

      {dadosMotor ? (
        <Grafico titulo={"Dados Motor"} dados={dadosMotor.slice(-20)} valorAtual={Number(mqttData.statusMotor)} />
      ) : (
        <p>Carregando dados...</p>
      )}
    </div>
  );
}
