import Controlador from "../../components/Controlador";
import { useRouter } from 'next/router'
import { getModuloMod } from "../../helpers/mods";
import { updateField } from "../../config/db";
import { useEffect } from "react";
export default function Modulo({auth}){
  const router =useRouter()
  const mod=getModuloMod({id:router.query.id})
  useEffect(()=>{
    updateField({coleccion:"mods",id:router.query.id,registro:{fechaClick:new Date()}})
 
  },[router.query.id])
  if(!mod)return "Cargando Mod..."
        return(
            <Controlador mod={mod} url={`${mod.nombre}`}/>
        )

}
// export async function getServerSideProps(context) {
//   const coleccion="mods"
//   const id=context.params.id
//   const registro={fechaClick:new Date()}
//   // updateField({coleccion,id,registro}) //para ordenar su menu

//   return {
//     props: {}, 
//   }
// }
