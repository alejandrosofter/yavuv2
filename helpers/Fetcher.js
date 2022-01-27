export default async function Fetch(url,method,data,token){
    
    const requestOptions = {
        method:method?method:"get",
        headers: { 'Content-Type': 'application/json', Authorization: `${token}` },
       
    };
    if(data)requestOptions.body= JSON.stringify(data)
    let res={}
    try{
        res= await fetch(url, requestOptions);
    }catch(err){
        console.log(err)
    }
   
    return await res.json();
}