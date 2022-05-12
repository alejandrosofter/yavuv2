import { fuego } from "@nandorojo/swr-firestore"
import { useEffect, useState } from "react"
export function useCollection2({collection,where,orderBy,limit,listen}){
    const [data,setData]=useState([])
    const [loading,setLoading]=useState(false)
    const [error,setError]=useState(false)

    const search=()=>{
        setLoading(true)
        const ref=fuego.db.collection(collection)
        if(where)for(let i in where)ref=ref.where(where[i][0],where[i][1],where[i][2])
        ref.get().then(snapshot=>{
            setData(snapshot.docs.map(doc=>({...doc.data(),id:doc.id})))
            setLoading(false)
        }).catch(err=>{
            setError(err)
            setLoading(false)
        }
        )
    }
    useEffect(()=>{
        search()
        
    },[])
    return {data,loading,error}
}