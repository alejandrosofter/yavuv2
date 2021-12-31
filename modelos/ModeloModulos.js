import * as yup from 'yup';

export default function ModeloModulos(){
    return yup.object().shape({
        nombre: yup.string().required(),
        detalle: yup.string(),
        icono: yup.string(),
        coleccion: yup.string(),
        camposModulo: yup.string(),
        id: yup.string(),
        esBase: yup.boolean(),
        createdOn: yup.date().default(function () {
            return new Date();
          }),
          acciones: yup.array().of(
            yup.object().shape({
              nombre: yup.string().required("Es requerido para buscar el componente el las librerias"),
              label: yup.string().required("Es requerido"),
              icono: yup.string(),
              
              descripcion: yup.string(),

            }) )
        
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
export function valoresInicialesItems(){
  return {
      nombre: "",
      label: "",
      icono: "",
      descripcion: "",
  }
}