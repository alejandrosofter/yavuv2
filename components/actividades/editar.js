import ModeloActividades, { valoresIniciales } from "../../modelos/ModeloActividades"
import EditarABM from "../forms/moduloABM/editarABM"
import FormActividad from "./_form"
export default function Modulo({modulo,token,mod}) {

    const urlAcepta=`/api/moduloABM/`
    const urlModulos=`/api/modulos/` 
    const coleccion=`actividades` 

      return (
      <EditarABM mod={mod} ComponenteForm={FormActividad} titulo="Editar" subTitulo="Actividad" icono="fas fa-pencil" coleccion={coleccion} token={token} urlAcepta={urlAcepta} 
      valoresIniciales={valoresIniciales} modelo={ModeloActividades} modulo={modulo}/>
      )

}