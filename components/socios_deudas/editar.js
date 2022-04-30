import Modelo,{valoresIniciales} from "../../modelos/ModeloSocioDeudas"
import EditarGenerico from "../EditarGenerico"
import Form from "./_form"

export default function Modulo({mod,callbackSuccess,preData}) {

      return (
      <EditarGenerico preData={preData} callbackSuccess={callbackSuccess} valoresIniciales={valoresIniciales} mod={mod} modelo={Modelo}>
          <Form  titulo="EDITAR" subTitulo={mod.label} icono={mod.icono} />
      </EditarGenerico>
      )

}