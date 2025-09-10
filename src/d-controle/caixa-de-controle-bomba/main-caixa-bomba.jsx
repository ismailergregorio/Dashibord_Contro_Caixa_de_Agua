import "./style-main-caixa-bomba.css";
import bomba from "../../../public/image/motor.png";

export default function ControleBomda() {
  return (
    <div className="controleBomba">
      <div className="controle">
        <div className="controleBtn">
          <h1>Ligar/Desligar:</h1>
          <input type="checkbox" />
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
        <img src={bomba} className="imgBomba" />
      </div>
    </div>
  );
}
