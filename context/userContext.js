import  {createContext,useState} from "react"

import {
    AuthAction,
    useAuthUser,
    withAuthUser,
    withAuthUserTokenSSR,
  } from 'next-firebase-auth'
const Contexto= createContext({})

export function ContextoUsuario({children}){
    const auth=useAuthUser()
    const [user,setUser]=useState(auth)
    
    return(
        <Contexto.Provider value={{user:user,setUser:setUser}}>
           
            {children}
            
        </Contexto.Provider>
    )
}
// export default Contexto
export default withAuthUser({
    
    whenUnauthedBeforeInit: AuthAction.REDIRECT_TO_LOGIN,
    whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  })(ContextoUsuario)