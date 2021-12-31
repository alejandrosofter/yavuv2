import  { MongoClient } from 'mongodb';
export async  function MongoDb(dataConexion){
    const uri =`mongodb://${dataConexion.host}:${dataConexion.port}/${dataConexion.db}`

    const client = new MongoClient(uri);
    try {
        return await client.connect();
    } catch (e) {
        console.error(e);
    }
}
// export async function getTablas(dataConexion)
// {
//     const conn=await MongoDb(dataConexion)
//     const db = conn.db(dataConexion.db);
//     if(db) return await db.collection("socios").find().limit(3)
//     // await conn.close();
// }
export async function getTablas(dataConexion)
{
    const conn=await MongoDb(dataConexion)
    const db = conn.db(dataConexion.db);
    if(db){
        const tablas= await db.listCollections()
        return await tablas.toArray()
    }
    // await conn.close();
}
export async function getCantidadRegistros(dataConexion,nameColeccion)
{
    const conn=await MongoDb(dataConexion)
    const db = conn.db(dataConexion.db);
    if(db){
        const tablas= await db.collection(nameColeccion).countDocuments({})
        return tablas
    }
    // await conn.close();
}
function getTipoDato(obj)
{
    let salida=[]
    Object.keys(obj).forEach(key => {
        let tipo=Array.isArray(obj[key])?"array":typeof obj[key]
        if(obj[key] instanceof Date) tipo="date"
        let aux={key,tipo}
        if(tipo=="array"){
            const arrObj=obj[key].length>0?obj[key][0]:{}
          
            aux.registro=getTipoDato(arrObj)
        }
        
        salida.push(aux) 
      });
      return salida;
}
function getCamposObjeto(item){
    let salida={}
    Object.keys(item).forEach(key => {
        salida={...salida,[key]:item[key]}
      });
      return salida;
}
function getRegistroItem(datos)
{
    let registro
    datos.map(item=>{
        const aux=getCamposObjeto(item)
        registro={...registro, ...aux}

    })
    return registro
}
export async function getRegistro(dataConexion,coleccion,pk,pkRegistro)
{
    const conn=await MongoDb(dataConexion)
    const db = conn.db(dataConexion.db);
    if(db){
        const datos= await db.collection(coleccion).find().toArray()
        
        const registro=getRegistroItem(datos)
      
        if(registro){
            let salida=getTipoDato(registro)
            return salida
        }
        return {}
    }
    // await conn.close();
}
export async function mfindAll(dataConexion,coleccion,params,limite)
{
    const conn=await MongoDb(dataConexion)
    const db = conn.db(dataConexion.db);
    if(db) return await(await db.collection(coleccion).aggregate([
        // {
        // $lookup:
        //     {
        //         from: "imagenes",
        //         localField: "idImagen",
        //         foreignField : "_id",
        //         as: "imagenesPerfil"
        //     }
        // }
    ])).toArray()
    // await conn.close();
}
export async function mfindAllPage(dataConexion,coleccion,desdeRegistro,cantidadRegistros)
{
    const conn=await MongoDb(dataConexion)
    const db = await conn.db(dataConexion.db);
    if(db) return await(await db.collection(coleccion).find().skip(desdeRegistro).limit(cantidadRegistros)).toArray()
    // await conn.close();
}
export async function mfindOne(dataConexion,coleccion,id)
{
    const conn=await MongoDb(dataConexion)
    const db = conn.db(dataConexion.db);
    if(db) return await(await db.collection(coleccion).find({_id:id}).aggregate([{
        $lookup:
            {
                from: "imagenes",
                localField: "idImagen",
                foreignField : "_id",
                as: "imagenesPerfil"
            }
        }]).limit(limite)).toArray()
    // await conn.close();
}