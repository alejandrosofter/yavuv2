import  { MongoClient } from 'mongodb';
export async  function MongoDb(dataConexion){
    const uri =`mongodb://${dataConexion.host}:${dataConexion.port}/${dataConexion.db}`
    console.log(uri)
    const client = new MongoClient(uri);
    try {
        return await client.connect();
    } catch (e) {
        console.error(e);
    }
}
export async function getTablas(dataConexion)
{
    const conn=await MongoDb(dataConexion)
    const db = conn.db(dataConexion.db);
    if(db) return await db.collection("socios").find().limit(3)
    // await conn.close();
}
export async function mfindAll(dataConexion,coleccion,params,limite)
{
    const conn=await MongoDb(dataConexion)
    const db = conn.db(dataConexion.db);
    if(db) return await(await db.collection(coleccion).aggregate([{
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