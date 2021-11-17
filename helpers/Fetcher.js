export default async function Fetch(url,method,data){
    const requestOptions = {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };
    const res= await fetch(url, requestOptions);
    return await res.json();
}