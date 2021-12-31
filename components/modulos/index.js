import ModuloIndexCard from "../ModuloIndex";
import VistaItemCard from "./_vistaItemCard";

export default function Modulo({token,modulo,dataUsuario,dataCuenta}) {
 
      return (
      <ModuloIndexCard token={token} vistaItem={VistaItemCard} url={`/api/${modulo.nombre}`} modulo={modulo} dataCuenta={dataCuenta} />
 
      )

}