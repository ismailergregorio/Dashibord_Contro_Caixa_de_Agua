import "./style-conteine-grafico.css";
import Grafico from "../components/grafico-controle/grafico";

export default function ConteinerGrafico() {
  return (
    <div className="continenta_grafico">
      <Grafico titulo={"Dados Caixa"} />
      <Grafico titulo={"Dados Atual"} />
    </div>
  );
}
