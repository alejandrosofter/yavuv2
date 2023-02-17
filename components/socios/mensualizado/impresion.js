// export default function ImpresionMovimientoCuenta({datos}){
//
// if(!datos) return "no hay datos"
//     return(
//         <div>Impresion movim {datos.nroRecivo}</div>
//     )
// }
import React from "react";
export default function Modulo() {
  return (
    React.forwardRef <
    HTMLInputElement >
    ((props, ref) => {
      if (!props.datos) return "no hay datos";
      return <div ref={ref}>RECIBO {props.datos.nroRecivo}</div>;
    })
  );
}
