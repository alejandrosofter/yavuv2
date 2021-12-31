import * as yup from 'yup';

export default function ModeloSocios(){
    return yup.object().shape({
        nombre: yup.string().required(),
        apellido: yup.string(),
        tipoSocio: yup.string(),
        // fechaNacimiento: yup.date(),
        createdOn: yup.date().default(function () {
            return new Date();
          }),
      });
}
export function valoresIniciales(){
    return {
        apellido: "",
        nombre: "",
        tipoSocio: "",
        fechaNacimiento: "",
    }
}
export function valoresInicialesCambioEstado(){
    return {
        estado: "",
        fecha: "",
    }
}
export  function ModeloCambioEstado(){
    return yup.object().shape({
              estado: yup.string().required(),
           
            }) 
      
}
export function valoresInicialesDocumentacion(){
    return {
        fechaVto: "",
        tipo: "",
    }
}
export  function ModeloDocumentos(){
    return yup.object().shape({
            //   fechaVto: yup.string().required(),
              tipo: yup.string()
           
            }) 
      
}
export function valoresInicialesTarjetas(){
    return {
        fecha:"",
        detalle: "",
    }
}
export  function ModeloTarjetas(){
    return yup.object().shape({
        //    fecha: yup.string(),
              detalle: yup.string()
           
            }) 
      
}
export function valoresInicialesActividades(){
    return {
        estaBaja:false,
        tieneImporteEspecial:false, 
        tieneVto:false,
        idActividad:"",
        fecha:""
    }
}
export  function ModeloActividades(){
    return yup.object().shape({
        //    fecha: yup.string(),
        estaBaja: yup.boolean(),
        tieneImporteEspecial: yup.boolean(),
        tieneVto: yup.boolean(),
                idActividad:yup.string(),

            }) 
      
}
////////////////////////////
export function valoresInicialesMovimiento(){
    return {
        
        importeAcredita:0,
        importeDebita:0,
        fecha:"",
        nroRecivo:"",


    }
}
export  function ModeloMovimientoCuenta(){
    return yup.object().shape({
        //    fecha: yup.string(),
        importeAcredita:yup.number(),
        importeDebita:yup.number(),
        nroRecivo:yup.string()

            }) 
      
}