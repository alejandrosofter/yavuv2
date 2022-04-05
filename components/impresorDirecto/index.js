import { Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const qz = require("qz-tray");
export default function Modulo(){
const [printers,setPrinters]=useState([])
const [certs,setCerts]=useState()
const inicializar=()=>{
    
    qz.websocket.connect().then(() => {
        return qz.printers.find();
    }).then((printers) => {
        setPrinters(printers)
        console.log(printers)
        let config = qz.configs.create(printers[0])
        return qz.print(config, [{
            type: 'pixel',
            format: 'html',
            flavor: 'plain',
            data: '<h1>Hello JavaScript!</h1>'
        }])
    }).then(() => {
        return qz.websocket.disconnect();
    }).then(() => {
        // process.exit(0);
    }).catch((err) => {
        console.error(err);
        if(qz.websocket.isActive())qz.websocket.disconnect()
    }).finally(()=>{
        if(qz.websocket.isActive())qz.websocket.disconnect()
    })
}
const firmar=(certificado,privateKey)=>{
    qz.security.setSignaturePromise(function (toSign) {
        return function (resolve, reject) {
            try {
                var pk = new RSAKey();
                pk.readPrivateKeyFromPEMString(privateKey);
                var hex = pk.signString(toSign, 'sha1');
                console.log("DEBUG: \n\n" + stob64(hextorstr(hex)));
                resolve(stob64(hextorstr(hex)));
            } catch (err) {
                console.error(err);
                reject(err);
            }
        };
    });
    qz.security.setCertificatePromise(function (resolve, reject) {
        resolve(certificado)
    })
}
const consultacerts=async()=>{
    const aux=await(await fetch(`/api/impresorDirecto`)).json()
    setCerts(aux)
}
useEffect(()=>{
    consultacerts()
   
},[])
useEffect(()=>{
//firmar

// firmar()
console.log(certs)
// inicializar()
},[certs])
    return(
        <Stack direction="row" spacing={2}> 
        {printers.map(printer=>
            <Typography>{printer}</Typography>
        )}
        </Stack>
    )
}
