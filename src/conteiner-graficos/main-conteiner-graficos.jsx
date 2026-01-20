import "./style-conteine-grafico.css";
import Grafico from "../components/grafico-controle/grafico";
import { useEffect, useState, } from "react";
import { toast } from "react-toastify";
import api from "../services/api";
export default function ConteinerGrafico({ mqttData }) {

  const getDadosCaixaStado = "/api/caixa";
  const getDadosMotoStado = "/api/motor";

  const [dadosCaixa, setDadosCaixa] = useState([]);
  const [dadosMotor, setDadosMotor] = useState([]);


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


  const getDadosCaixa = async () => {
    try {
      const res = await api.get(getDadosCaixaStado);
      setDadosCaixa(res.data);
    } catch (err) {
      console.error("Erro na busca", err);
      toast.error("Erro nos Dados ou Sem Autorização "+err)
    }
  }

  const getDadosMotor = async () => {
    try {
      const res = await api.get(getDadosMotoStado);
      setDadosMotor(res.data);
    } catch (err) {
      console.error("Erro na busca", err);
      toast.error("Erro nos Dados ou Sem Autorização "+err)

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
