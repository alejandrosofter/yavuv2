import * as yup from 'yup';
import {fuego} from '@nandorojo/swr-firestore'
export default function Modelo(){
  return yup.object().shape({

      detalle: yup.string(),
      estado: yup.string(),
      
        
      
    });
}
export function valoresIniciales(data){
  let valores= {
      estado: "PENDIENTE",
      paciente: "",
      detalle:"",
      duracion:"",
      fechaTurno:new Date(),
      fecha:new Date(),
      idUsuario:fuego.auth().currentUser.uid
  }
  return {...valores,...data}
}
export  function ModeloHorarios(){
  return yup.object().shape({
      desde: yup.string().required(),
      hasta: yup.string(),
      cada: yup.string(),
      dias: yup.array(),
      
        
      
    });
}
export function valoresInicialesHorarios(data){
  let valores= {
      hasta: "",
      desde:"",
      cada:"",
      dias:"",
      idUsuario:fuego.auth().currentUser.uid
  }
  return {...valores,...data}
}

