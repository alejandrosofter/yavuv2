import  { SWRConfig } from 'swr'
export default function SwrComponente({milsRefresca,children,token}){
    return(
<SWRConfig
        value={{
        refreshInterval: milsRefresca?milsRefresca:1000,
        fetcher: (url) => fetch(url,{ headers: { 'Content-Type': 'application/json', Authorization: `${token}`}}).then(res => res.json())
        }} >
            {children}
        </SWRConfig>
    )
}