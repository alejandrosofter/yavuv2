import * as yup from 'yup';

export default function ModeloPromociones(){
    return yup.object().shape({
        
        modDeuda: yup.string(),
        estado: yup.string(),
        createdOn: yup.date().default(function () {
            return new Date();
          }),
      });
}
export function valoresIniciales(){
    return {
        fechaVto: {seconds:new Date().getTime()/1000,nanoseconds:0},
        modDeuda: "",
        concepto: "",
        estado:"PENDIENTE"
    }
}
export  function ModeloItems(){
    return yup.object().shape({
        idProducto: yup.object().required(),
        detalle: yup.string(),
        importe: yup.string(),
        porcentaje: yup.string(),
        createdOn: yup.date().default(function () {
            return new Date();
          }),
      });
}
export function valoresInicialesItems(){
    return {
        detalle: "",
        importe: 0,
        porcentaje:0
    }
}
