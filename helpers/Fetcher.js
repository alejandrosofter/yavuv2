export default async function Fetch(url,method,data,token){
 
    const requestOptions = {
        method:method?method:"get",
        headers: { 'Content-Type': 'application/json', Authorization: `${token}` },
       
    };
    if(data)requestOptions.body= JSON.stringify(data)
    
    const res= await fetch(url, requestOptions);
    return await res.json();
}