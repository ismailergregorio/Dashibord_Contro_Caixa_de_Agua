import './style-main-controler.css'
import Relatorio from './caixa-de-relatorio/relatorio'
import CaixaSensores from './caixa-de-controle-sensores/main-caixa-sensores'
import ControleBomda from './caixa-de-controle-bomba/main-caixa-bomba'

export default function MainControle(){
 return(
  <div>
   <Relatorio/>
   <CaixaSensores/>
   <ControleBomda/>
  </div>
 )
}