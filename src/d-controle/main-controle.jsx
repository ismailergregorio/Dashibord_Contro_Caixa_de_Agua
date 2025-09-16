import "./style-main-controler.css";
import Relatorio from "./caixa-de-relatorio/relatorio";
import CaixaSensores from "./caixa-de-controle-sensores/main-caixa-sensores";
import ControleBomda from "./caixa-de-controle-bomba/main-caixa-bomba";
import CaixaConfig from "./caixa-config/main-caixa-config";

export default function MainControle() {
  return (
    <div className="main-controler">
      <Relatorio />
      <div className="caixa_sensor_e_caixa_config">
        <CaixaSensores />
        <CaixaConfig />
      </div>
      <ControleBomda />
    </div>
  );
}
