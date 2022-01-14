// export default function ImpresionMovimientoCuenta({datos}){
// console.log(datos)
// if(!datos) return "no hay datos"
//     return(
//         <div>Impresion movim {datos.nroRecivo}</div>
//     )
// }
import React from "react"
const ImpresionActividadSocio = React.forwardRef((props, ref) => {
    if(!props.datos) return "no hay datos"
    return (
      <div  ref={ref}>
          Fecha Inicio 
      </div>
    );
  });

  export default ImpresionActividadSocio