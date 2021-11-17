import Layout from "../layout";
import _FormModulos from "./_form";
export default function nuevo({modulo}){

    return(
        <>
             <_FormModulos nuevo={true} modulo={modulo} />
        </>
    )
}