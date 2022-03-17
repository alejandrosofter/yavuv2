export const getFieldName=(field,campo)=>{
    const aux=field?`${field}.${campo}`:campo

    return aux
}