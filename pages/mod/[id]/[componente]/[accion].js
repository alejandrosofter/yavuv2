import Controlador from "../../../../components/Controlador"

export default function ModuloNivel1({}){

    return(
      <Controlador pathComponente={"${router.query.componente}/${router.query.accion}"} />
    )

}