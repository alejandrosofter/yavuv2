import Modelo, { valoresIniciales } from "../../modelos/ModeloProfesores"
import EditarABM from "../forms/moduloABM/editarABM"
import Form from "./_form"
export default function Modulo({modulo,token}) {

    const urlAcepta=`/api/moduloABM/`
    const urlModulos=`/api/modulos/` 
    const coleccion=`profesores` 

      return (
      <EditarABM ComponenteForm={Form} titulo="Editar" subTitulo="Profesor" icono="fas fa-pencil" coleccion={coleccion} token={token} urlAcepta={urlAcepta} 
      valoresIniciales={valoresIniciales} modelo={Modelo} modulo={modulo}/>
      )

}