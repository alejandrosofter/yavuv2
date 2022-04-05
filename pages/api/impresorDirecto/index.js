export default async function handler(req, res) {
    const {  } = req.query
    const fs = require('fs')
    const cert = fs.readFileSync('./cert.txt',
            {encoding:'utf8', flag:'r'})
    const key = fs.readFileSync('./key.txt',
            {encoding:'utf8', flag:'r'})
    
    console.log({cert,key})
    console.log("??")
    res.status(200).json({cert,key})
  
}