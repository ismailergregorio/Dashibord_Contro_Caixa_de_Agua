import "./style-main-caixa-sensor.css"
import StatusSensor from "../../components/controle-sensor/status-sensor"

export default function CaixaSensores({sensor1,sensor2,sensor3}){
 return(
  <div className="sensores">
   <StatusSensor texto="1" stado={sensor1}/>
   <StatusSensor texto="2" stado={sensor2}/>
   <StatusSensor texto="3" stado={sensor3}/>
  </div>
 )
}