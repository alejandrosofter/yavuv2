import * as yup from 'yup';

export default function ModeloGeneracionDeuda(){
    return yup.object().shape({
        concepto: yup.string().required(),
        detalle: yup.string(),
        createdOn: yup.date().default(function () {
            return new Date();
          }),
      });
}
export function ModeloGeneracionDeudaItems()
{
    return yup.object().shape({
        concepto: yup.string().required(),
        detalle: yup.string(),
        detalleExtra: yup.string(),
        estado: yup.string(),
        createdOn: yup.date().default(function () {
            return new Date();
          }),
      });
}
export function valoresInicialesItems(){
    return {
        fecha:{seconds:new Date().getTime()/1000,nanoseconds:0},
        fechaVto:{seconds:new Date().getTime()/1000,nanoseconds:0},
        detalleExtra: "",
        estado: "",
        idDestino: "",
        idElemento: "",
        idGeneracionDeuda: "",
        importe: "",
        importeBonificacion: "",
        estado: "",
        estado: "",

        estado:"PENDIENTE"
    }
}
export function valoresIniciales(){
    return {
        fecha:{seconds:new Date().getTime()/1000,nanoseconds:0},
        fechaVto: {seconds:new Date().getTime()/1000,nanoseconds:0},
        detalle: "",
        concepto: "",
        estado:"PENDIENTE"
    }
}