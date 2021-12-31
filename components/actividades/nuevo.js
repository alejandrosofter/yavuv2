import NuevoABM from "../forms/moduloABM/nuevoABM"

export default function Modulo({modulo,token}) {
    const router=useRouter();
    const urlAcepta=`/api/moduloABM/`
    const urlModulos=`/api/modulos/` 
    const coleccion=`actividades` 

      return (
      <NuevoABM pathForm="./_form.js" coleccion={coleccion} token={token} urlAcepta={urlAcepta} 
      valoresIniciales={valoresIniciales} modulo={modulo}/>
      )

}