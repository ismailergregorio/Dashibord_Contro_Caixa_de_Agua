import "./style-status-sensor.css";

export default function StatusSensor({ texto }) {
  return (
    <div className="sensor">
      <div className="textStatus">
        <h1>Sensor:{texto}</h1>
        <h2>Status:{texto}</h2>
      </div>
      <div className="Sinalisacao">
        <div className="ativo"></div>
        <div className="destivado"></div>
      </div>
    </div>
  );
}
