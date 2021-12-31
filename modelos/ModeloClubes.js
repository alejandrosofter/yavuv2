import * as yup from 'yup';

export default function ModeloClubes(){
    return yup.object().shape({
        nombre: yup.string().required(),
        domicilio: yup.string().required(),
        razonSocial: yup.string(),
        cuit: yup.string(),
        telefonoMobil: yup.string(),
        profesores: yup.array().of(
            ModeloClubesProfesores() ),
        actividades: yup.array().of(
            ModeloClubesActividades() )
      });
}
export  function ModeloClubesProfesores(){
    return yup.object().shape({
        nombre: yup.string().required(),
        apellido: yup.string().required(),
        dni: yup.string(),
        telefono: yup.string(),
              
            }) 
      
}
export  function ModeloClubesActividades(){
    return yup.object().shape({
              nombre: yup.string().required(),
        
              profesor: yup.string(),
              desdeEdad:yup.number(),
              hastaEdad:yup.number(),
              esPorEdades:yup.boolean(),
              estado:yup.string(),
              detalle:yup.string()
              
            }) 
      
}
export function valoresInicialesProfesores(){
    return {
        nombre: "",
        apelldio: "",
        dni: "",
        telefono: "",
}
}
export function valoresInicialesActividades(){
    return {
        nombre: "",
        desdeFecha: "",
        hastaFecha: "",
        profesor: "",
        desdeEdad: "",
        hastaEdad:"",
        estado:"",
        esPorEdades:"",
        detalle:"",
    }
}
export function valoresIniciales(){
    return {
        nombre: "",
        domicilio: "",
        razonSocial: "",
        cuit: "",
        telefonoMobil: "",
        profesores:[],
        actividades:[]
    }
}
