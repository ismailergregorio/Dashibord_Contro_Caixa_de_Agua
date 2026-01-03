import "./style-relatorio.css";

export default function Relatorio({logs }) {

  return (
    <div className="conteiner-relatorio">
      <div className="relatorio-heder">
        <h1>Relatório</h1>
      </div>

      <div className="caixaRelatorio">
        {logs.map((log, index) => (
          <p key={index}>{log}</p>
        ))}
      </div>
    </div>
  );
}
