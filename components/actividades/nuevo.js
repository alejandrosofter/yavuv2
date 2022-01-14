import ModeloActividades, { valoresIniciales } from "../../modelos/ModeloActividades"
import NuevoABM from "../forms/moduloABM/nuevoABM"
import FormActividad from "./_form"
export default function Modulo({modulo,token}) {

    const urlAcepta=`/api/moduloABM/`
    const urlModulos=`/api/modulos/` 
    const coleccion=`actividades` 

      return (
      <NuevoABM ComponenteForm={FormActividad} titulo="Nueva" subTitulo="Actividad" icono="fas fa-plus" coleccion={coleccion} token={token} urlAcepta={urlAcepta} 
      valoresIniciales={valoresIniciales} modelo={ModeloActividades} modulo={modulo}/>
      )

}