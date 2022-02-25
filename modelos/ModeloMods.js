import * as yup from 'yup';

export default function ModeloMods(){
    return yup.object().shape({
   
        nombre: yup.string().required(),

        label: yup.string().required(),
      detalle: yup.string(),
      icono: yup.string(),
      coleccion: yup.string(),
      camposModulo: yup.string(),

      coleccionDeuda: yup.string(),
      campoClave: yup.string(),
      idUsuario: yup.string(),
      esBase: yup.boolean(),
        
      });
}
export function valoresIniciales(){
    return {
        nombre: "",
        detalle: "",
        icono: "",
        acciones: [],
    }
}