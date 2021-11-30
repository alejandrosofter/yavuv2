import * as yup from 'yup';

export default function ModeloMods(){
    return yup.object().shape({
        idModulo: yup.string(),
        idUsuario: yup.string(),
        createdOn: yup.date().default(function () {
            return new Date();
          }),
          acciones: yup.array().of(
            yup.object().shape({
              nombre: yup.string().required("Es requerido para buscar el componente el las librerias"),
              enabled: yup.boolean(),

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