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
    console.log('Connected to', TCP_URL)
  
    client.subscribe('/test', (err) => {
      console.log(err || 'Subscribe Success')
    })
  
    // client.publish('/test', 'Hello EMQ X', (err) => {
    //   console.log(err || 'Publish Success')
    // })
  
  })
  
  // handle message event
  client.on('message', (topic, message) => {
    console.log('Received form', topic, ':', message.toString())
  
    // disconnect
    // client.end()
  })
    res.status(200).json({})
}