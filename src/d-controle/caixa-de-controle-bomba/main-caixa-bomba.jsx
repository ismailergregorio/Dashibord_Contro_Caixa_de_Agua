import "./style-main-caixa-bomba.css";
import bomba from "../../../public/image/motor.png";
import raioligado from "../../../public/image/raio-ligado.png";

export default function ControleBomda() {
  return (
    <div className="controleBomba">
      <div className="controle">
        <div className="controleBtn">
          <label htmlFor="btnMotor" className="toogle">
            <h1>Desligar/Ligar:</h1>
            <div className="btn">
              <input type="checkbox" id="btnMotor" />
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
        <img src={raioligado} className="imgRaio"/>
        <img src={bomba} className="imgBomba" />
      </div>
    </div>
  );
}
