import mqtt from 'mqtt'
export default async function handler(req, res) {
    const { id } = req.query
    
    const TCP_URL = 'mqtt://localhost:1883'
    const options = {
        connectTimeout: 4000,
        clientId: 'server',
        // username: 'emqx',
        // password: 'emqx',
  
        keepalive: 60,
        clean: true,
    }
    const client = mqtt.connect(TCP_URL, options)
    // after connect
client.on('connect', () => {
    
  
    client.subscribe('/test', (err) => {
      
    })
  
    // client.publish('/test', 'Hello EMQ X', (err) => {
    //   
    // })
  
  })
  
  // handle message event
  client.on('message', (topic, message) => {
    )
  
    // disconnect
    // client.end()
  })
    res.status(200).json({})
}