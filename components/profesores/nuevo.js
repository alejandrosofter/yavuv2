import Modelo, { valoresIniciales } from "../../modelos/ModeloProfesores"
import NuevoABM from "../forms/moduloABM/nuevoABM"
import FormActividad from "./_form"
export default function Modulo({modulo,token}) {

    const urlAcepta=`/api/moduloABM/`
    const urlModulos=`/api/modulos/` 
    const coleccion=`profesores` 

      return (
      <NuevoABM ComponenteForm={FormActividad} titulo="Nuevo" subTitulo="Profesor" icono="fas fa-plus" coleccion={coleccion} token={token} urlAcepta={urlAcepta} 
      valoresIniciales={valoresIniciales} modelo={Modelo} modulo={modulo}/>
      )

}