import { postData } from "@helpers/Fetcher"
const TIME_OUT_INNERTEXT=5000

export default async function handler(req, res) {

    const dataParse = req.body
    
    postData(`${process.env.URL_EJECUTA_BOOTWEB}`, dataParse)
    .then(async result => {
        const resultJson=await result.json()
        res.status(200).json(resultJson)
    })
    .catch(error => {
      console.log(error)
        res.status(500).json({error})
    })
    
    
}

const ejecutaAccion=async ({accion,page,params})=>{
    console.log(accion.accion,accion.subAccion,accion.selector)
    if(!accion.subAccion || accion.subAccion===""){
        
        let selector=accion.selector
        if(accion.accion==="waitForTimeout")selector=Number(selector)
        return await page[accion.accion](selector)
    }
    const options= accion.subAccion==="innerText"?{ timeout: TIME_OUT_INNERTEXT}:{}
    const parametrosSub=accion.subAccion==="innerText"?options:accion.esEntrada?params[accion.parametros]:accion.parametros
    console.log(options)
    return await page.frameLocator('iframe')[accion.accion](accion.selector,options)[accion.subAccion](parametrosSub)
}
const ejecutaRutina=async ({rutina,page,params})=>{
    let results={}
    try{
        for (let i = 0; i < rutina.length; i++){
            const result=await ejecutaAccion({accion:rutina[i],page,params})
            if(rutina[i].esSalida)results[rutina[i].nombreSalida]=result
        }
    }catch(err){
        console.error(err)
    }
    return results
}
//     afiliado = await page.frameLocator('iframe').locator("//body[@class='body']/div/form[@name='ticketForm']/table[2]/tbody/tr/td/table[1]/tbody/tr[5]/td[2]").innerText()


//   // Go to https://seros.conexia.com.ar:8443/WebPrestador/
//   await page.goto('https://seros.conexia.com.ar:8443/WebPrestador/');

//   await page.frameLocator('iframe').locator('[placeholder="Nombre Usuario"]').fill(usuario);
//   // Press Tab
//   await page.frameLocator('iframe').locator('[placeholder="Nombre Usuario"]').press('Tab');
//   // Fill [placeholder="Contrase??a"]
//   await page.frameLocator('iframe').locator('[placeholder="Contrase??a"]').fill(clave);
//   // Click input:has-text("Ingresar")
//   await page.frameLocator('iframe').locator('input:has-text("Ingresar")').click();
//   // Select 01
//   await page.frameLocator('iframe').locator('select[name="consultorioSelected"]').selectOption('01');
//   // Click text=Confirmar
//   await page.frameLocator('iframe').locator('text=Confirmar').click();
//   // Click text=Gesti??n
//   await page.frameLocator('iframe').locator('text=Gesti??n').click();
//   // Click text=Identificar Afiliado
//   await page.frameLocator('iframe').locator('text=Identificar Afiliado').click();
//   // Click text=Ingreso Manual
//   await page.frameLocator('iframe').locator('text=Ingreso Manual').click();
//   // Click input[name="dni"]
//   await page.frameLocator('iframe').locator('input[name="dni"]').click();
//   // Fill input[name="dni"]
//   await page.frameLocator('iframe').locator('input[name="dni"]').fill(dniPaciente);
//   // Click text=Continuar
//   await page.frameLocator('iframe').locator('text=Continuar').click()
    
// //   
// await page.waitForResponse("https://seros.conexia.com.ar:8443/WebPrestador/elegibilidad.do")
// await page.waitForTimeout(1000)