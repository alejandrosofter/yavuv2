// export default function ImpresionMovimientoCuenta({datos}){
// console.log(datos)
// if(!datos) return "no hay datos"
//     return(
//         <div>Impresion movim {datos.nroRecivo}</div>
//     )
// }
import React from "react"
const ImpresionMovimientoCuenta = React.forwardRef((props, ref) => {
    if(!props.datos) return "no hay datos"
    return (
      <div  ref={ref}>
          RECIBO {props.datos.nroRecivo}
      </div>
    );
  });
 
  export default ImpresionMovimientoCuenta