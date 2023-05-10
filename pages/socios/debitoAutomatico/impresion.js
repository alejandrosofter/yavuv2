import React from "react"
const ImpresionData=()=>{
return React.forwardRef<HTMLInputElement>((props, ref) => {
  if(!props.datos) return "no hay datos"
  return (
    <div  ref={ref}>
        impresion cambios estado
    </div>
  );
})
} 
export default ImpresionData
 