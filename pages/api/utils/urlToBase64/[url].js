import imageToBase64 from "image-to-base64";
export default async function handler(req, res) {
  const { url } = req.query;

  const image64 = await imageToBase64(url);
  if (!image64) res.status(200).json({});
  else res.status(200).json(image64);
}
