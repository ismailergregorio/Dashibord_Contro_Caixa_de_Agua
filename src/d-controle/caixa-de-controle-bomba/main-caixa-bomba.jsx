import "./style-main-caixa-bomba.css";
import bomba from "../../../public/image/motor.png";
import raioligado from "../../../public/image/raio-ligado.png";

export default function ControleBomda({ mqttData }) {

  return (
    <div className="controleBomba">
      <div className="controle">
        <div className="controleBtn">
          <label htmlFor="btnMotor" className="toogle">
            <h1>Desligar/Ligar:</h1>
            <div className="btn">
              <input type="checkbox" id="btnMotor" checked={Number(mqttData.statusMotor)} onChange={mqttData.ligarMotor}/>
              <div className="circulo" />
            </div>
          </label>
        </div>
        <div className="statusMotor">
          <h1>Status:</h1>
          <div className="controleStatusMotor">
            <div className={mqttData.statusMotor === "1" ? "bombaLigar_ativado" : "bombaLigar"}></div>
            <div className={mqttData.statusMotor === "1" ? "bombaDesligar" : "bombaDesligar_ativado"}></div>
          </div>
        </div>
      </div>
      <div className="conteinerBomba">
        <img src={raioligado} className={mqttData.statusMotor === "1" ? "blink" : "imgRaio"} />
        <img src={bomba} className="imgBomba" />
      </div>
    </div>
  );
}
