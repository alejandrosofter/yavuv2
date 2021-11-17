import Head from 'next/head'
import Image from 'next/image'
import { signIn, signOut, useSession } from "next-auth/client"
import { useRouter } from 'next/router'
import {useEffect} from "react"
import Layout from '../components/layout'
export default function Home() {
  const [session, loading] = useSession()
  const router = useRouter()

  useEffect(() => {
    
    // if(!session)router.push("/login")
  })

  if (session) {
      return (
      <Layout acciones={[]} titulo="HOME">
        hola
      </Layout>
      )
  }
  return (
    <></>
  )
}
Home.auth = true