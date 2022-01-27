import * as yup from 'yup';

export default function ModeloActividades(){
    return yup.object().shape({
        nombreActividad: yup.string().required(),
        detalle: yup.string(),
        icono: yup.string(),
        createdOn: yup.date().default(function () {
            return new Date();
          }),
       
        
      });
}
export function valoresInicialesItems()
{
    return {
        nombreActividad: "",
        profesor: "",
        detalle: "",
        importe: 0,
    }
}
export function ModeloItems()
{
    return yup.object().shape({
        nombreActividad: yup.string().required(),
        profesor: yup.string(),
        detalle: yup.string(),
        importe: yup.number(),
        createdOn: yup.date().default(function () {
            return new Date();
          }),
       
        
      });
}
export function valoresIniciales(){
    return {
        nombreActividad: "",
        detalle: "",
        icono: "",
        acciones: [],
    }
}
///////////////////////////////
export function valoresInicialesPeriodos()
{
    return {
        nombrePeriodo: "",
        estado: "",
    }
}
export function ModeloPeriodos()
{
    return yup.object().shape({
        nombrePeriodo: yup.string().required(),
        estado: yup.string()
       
        
      });
}
///////////////////////////