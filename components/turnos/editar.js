import Modelo,{valoresIniciales} from "../../modelos/ModeloTurnos"
import EditarGenerico from "../EditarGenerico"
import Form from "./_form"

export default function Modulo({mod,callbackSuccess,idItem}) {

      return (
      <EditarGenerico idItem={idItem} callbackSuccess={callbackSuccess} valoresIniciales={valoresIniciales} 
      mod={mod} modelo={Modelo}>
          <Form   subTitulo={mod.label} icono={mod.icono} />
      </EditarGenerico>
      )

}