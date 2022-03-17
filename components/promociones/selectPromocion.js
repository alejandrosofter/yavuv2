import { useCollection,fuego } from '@nandorojo/swr-firestore';
import Select2 from "../forms/select2Formik"
export default function Modulo({callbackchange}){
    const {data:promociones}=useCollection("promociones",{where:["idUsuario","==",fuego.auth().currentUser.uid]})
    if(!promociones) return ""
    return(
        <Select2 callbackchange={callbackchange} campo='idPromocion' label="Promo Asociada" lista={promociones} campoId="id" 
            campoLabel="nombrePromocion" />
    )
}