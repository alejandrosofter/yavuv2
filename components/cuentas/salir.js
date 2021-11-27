export default function salir({auth}){
    if(auth)auth.signOut()
    return <i>Saliendo</i>
}