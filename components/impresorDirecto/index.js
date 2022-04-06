import { Stack, Typography,Icon, Button } from "@mui/material";
import { useEffect, useState } from "react";
import {fuego} from "@nandorojo/swr-firestore"
import {utf8_to_b64} from "@helpers/Strings"
var r = require('jsrsasign');
const qz = require("qz-tray");
export default function Modulo({html}){
const [printers,setPrinters]=useState([])
const [certs,setCerts]=useState()

const imprimir=async (printer)=>{
    if(certs) 
            await firmar(certs.cert,certs.pk)
            qz.websocket.connect().then(() => {
                const config = qz.configs.create(printer, { })
                const data = [{
                    type: 'pixel',
                    format: 'html',
                    flavor: 'base64',
                    data: utf8_to_b64(html) 
                }]
                qz.print(config, data).catch(function(e) { console.error(e); });
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
const mostrarImpresoras=async ()=>{
    if(certs) 
        if(!qz.websocket.isActive()){
            await firmar(certs.cert,certs.pk)
            qz.websocket.connect().then(() => {
                return qz.printers.find();
            }).then((printers) => {
                setPrinters(printers)
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
    
}
const firmar=async (certificado,privateKey)=>{
    
        await qz.security.setCertificatePromise(function (resolve, reject) {
            resolve(certificado)
        })
    await qz.security.setSignaturePromise(function(toSign) {
        return function(resolve, reject) {
            try {
                var pk = r.KEYUTIL.getKey(privateKey);
                var sig = new r.KJUR.crypto.Signature({"alg": "SHA1withRSA"});
                sig.init(pk); 
                sig.updateString(toSign);
                var hex = sig.sign();
                resolve(r.stob64(r.hextorstr(hex)));
            } catch (err) {
                console.error(err);
                reject(err);
            }
        };
    });
}
const handlePrint=(printer)=>{
    imprimir(printer)
}
const consultacerts=async()=>{
    const aux=await fuego.db.collection("certificados").doc("certQz").get()
   
    setCerts(aux.data())
} 
useEffect(()=>{
    consultacerts()
   
},[])
useEffect(()=>{
    mostrarImpresoras()
},[certs])
    return(
        <Stack direction="row" spacing={2}> 
        {printers.map(printer=>
        <Button key={printer} color="inherit" onClick={handlePrint.bind(this,printer)}>
            <Icon sx={{mr:1}} className="fas fa-print"/> {printer}
        </Button>
            
        )}
        </Stack>
    )
}
