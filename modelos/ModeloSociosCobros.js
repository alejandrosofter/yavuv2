import * as yup from 'yup';

export default function Modelo(){
    return yup.object().shape({
        fecha: yup.string().required(),
        idSocio: yup.string().required(),
        detalle: yup.string(),
        importe: yup.number(),
       
        importeTotal: yup.number(),
        importeBonifica: yup.number(),
        importePaga: yup.number(),                      

      });
}                                                                                                                                                                                                                                                                                                                                                                                                                               
export function valoresIniciales(){
    return {                                                                                                                                                
        cliente: "",
        detalle: "",
        importe: 0,
        importeBonificacion: 0,
        importeTotal: 0,           
        importePaga: 0,                                            
        estado:"CANCELADA",
        fecha: {seconds:new Date().getTime()/1000,nanoseconds:0},
    }
}
export  function ModeloItems(){
    return yup.object().shape({
        detalle: yup.string().required(),
        importe: yup.number(),
        importeBonifica: yup.number(),
        importeTotal: yup.number(),

      });
}
export function valoresInicialesItems(){
    return {
        detalle: "",
        importe: "",
        importeBonifica: 0,
        importeTotal: 0,
    }
}
export  function ModeloFormasDePago(){
    return yup.object().shape({
        formaPago: yup.string().required(),
        importe: yup.number().required(),

      });
}
export function valoresInicialesFormaPago(importe){
    console.log(importe)
    return {
        formaPago: "",
        importe: importe?importe:0
    }
}