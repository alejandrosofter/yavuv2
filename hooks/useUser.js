import  {useContext} from "react"
import Context from "../context/userContext"
import { useAuthUser} from 'next-firebase-auth'
export default function UseUser(){
    return useContext(Context)
}
