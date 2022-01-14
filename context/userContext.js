import  {createContext,useState} from "react"
import  useSWR, { SWRConfig } from 'swr'
import {
    AuthAction,
    useAuthUser,
    withAuthUser,
    withAuthUserTokenSSR,
  } from 'next-firebase-auth'
const Contexto= createContext({})

export function ContextoUsuario({children,tokenServer}){
  
    const [token,setToken]=useState(tokenServer)
    const [user,setUser]=useState({})
    
    return(
        <Contexto.Provider value={{user:user,setUser:setUser,token:token,setToken:setToken}}>
           
            {children}
            
        </Contexto.Provider>
    )
}
export default Contexto
// export default withAuthUser({
    
//     whenUnauthedBeforeInit: AuthAction.REDIRECT_TO_LOGIN,
//     whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
//   })(ContextoUsuario)