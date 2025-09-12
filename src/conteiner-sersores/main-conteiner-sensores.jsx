import "./style-conteiner-sensor.css";
import Medidor from "../components/medidor-sensores/main-medidor";

export default function ConteinerSensor() {
  return (
    <div className="conteiner-sensor">
      <Medidor titulo={"Sensor de Preção Atimosferica"} valor={15} />
      <Medidor titulo={"Sensor de Tenperatura"} valor={50} />
      <Medidor titulo={"Sensor de Umidade"} valor={150} />
    </div>
  );
}
