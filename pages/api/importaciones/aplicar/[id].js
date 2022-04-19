export default async function handler(req, res) {
    const { id } = req.query
    const url=`https://us-central1-yavu-98cac.cloudfunctions.net/importaciones_cargar?id=${id}`
    fetch(url)
    .then(async response => res.status(200).json(await response.json()))
    .catch(error => console.error('Error:', error))

    
}