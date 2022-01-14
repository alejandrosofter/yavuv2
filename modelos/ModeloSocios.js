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
export function ModeloItemMovimientoCuenta(){
    return yup.object().shape({
        detalle: yup.string().required(),
        tipoItem: yup.string().required(),
        importe: yup.string().required(),
     
      }) 
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
export  function ModeloConfig(){
    return yup.object().shape({
        //    fecha: yup.string(),
              detalle: yup.string()
           
            }) 
      
}
export  function ModeloTipoSocios(){
    return yup.object().shape({
        //    fecha: yup.string(),
              nombre: yup.string(),
            proximoNro:yup.number()
            }) 
      
}
export  function ModeloTipoConfig(){
    return yup.object().shape({
        //    fecha: yup.string(),
              nombreTipoDocumentacion: yup.string()
           
            }) 
      
}
export function valoresInicialesActividades(){
    return {
        estaBaja:false,
        tieneImporteEspecial:false, 
        tieneVto:false,
        idActividad:"",
        fechaInicio:""
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
export function valoresInicialesMovimiento({dataInicial}){
    const fe={seconds:new Date().getTime()/1000,nanoseconds:0}
    return {
        
        importeAcredita:0,
        importeDebita:0,
        fecha:fe,
        nroRecivo:dataInicial?dataInicial.nroRecivo:"",


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