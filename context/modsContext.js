import  {createContext,useState} from "react"

const Contexto= createContext({})

export function ContextoMods({children,modulo_,mod_}){
  
    const [mod,setMod]=useState(mod_)
    const [modulo,setModulo]=useState(modulo_)
    
    return(
        <Contexto.Provider value={{mod:mod,setMod:setMod,modulo:modulo,setModulo:setModulo}}>
           
            {children}
            
        </Contexto.Provider>
    )
}
export default Contexto