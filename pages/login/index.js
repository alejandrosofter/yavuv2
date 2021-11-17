import * as React from 'react';

import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import LayoutLogin from '../../components/layoutLogin';

import { useRouter } from 'next/router'
import Image  from 'next/image'
import { signIn, signOut, useSession } from "next-auth/client"
import Dialogo from '../../components/forms/dialogo';
import { useState } from 'react';
const requestOptions= (data)=> {

    return {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }
};
const Login = ({})=>{
    const [dialog, setdialog] = useState(false);
    const router = useRouter()
    const ir=e=>{
        router.push("/")
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const req=requestOptions({usuario:data.get('usuario'),clave:data.get('clave')})
        
        const res=await fetch("/api/login",req);
        if(res.ok){
           
            
        }
            else setdialog(true)
            
       
      };
      const [session, loading] = useSession()
      if (session) {
          return (
          <>
              Signed in as {session.user.email} <br />
              <button onClick={() => signOut()}>Sign out</button>
          </>
          )
      }
    return (
        <LayoutLogin titulo="INGRESO YAVU">
             <Dialogo open={dialog} icon="fas fa-sign-out-alt" setOpen={setdialog} 
             titulo="Ops..." detalle="Los datos son incorretos" />
            <Box  noValidate sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                <Grid item xs={4}>
                        <a onClick={() => signIn("google")} href="#">
                            <Image width="80" alt="Google login" height="80" objectFit='contain'  src="/images/icoGoogle.png" />
                        </a>

                    </Grid>
                    <Grid item xs={4}>
                    
                        <Image width="80" height="80" alt="Facebook login"  objectFit='contain'   src="/images/icoFace.png" />
  
                    </Grid>
                    <Grid item xs={4}>
                    
                        <Image width="80" height="80" alt="Email login"  objectFit='contain'  src="/images/icoEmail.png" />
  
                    </Grid>
                    
                </Grid>

            </Box>
        </LayoutLogin>
    )
    
}
export default Login;