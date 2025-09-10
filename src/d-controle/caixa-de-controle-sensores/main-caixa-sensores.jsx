import "./style-main-caixa-sensor.css"
import StatusSensor from "../../components/controle-sensor/status-sensor"

export default function CaixaSensores(){
 return(
  <div className="sensores">
   <StatusSensor texto="1"/>
   <StatusSensor texto="2"/>
   <StatusSensor texto="3"/>
  </div>
 )
}