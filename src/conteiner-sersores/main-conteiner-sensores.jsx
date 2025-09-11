import "./style-conteiner-sensor.css";
import Medidor from "../components/medidor-sensores/main-medidor";

export default function ConteinerSensor() {
  return (
    <div className="conteiner-sensor">
      <Medidor titulo={"Sensor de Preção Atimosferica"} />
    </div>
  );
}
