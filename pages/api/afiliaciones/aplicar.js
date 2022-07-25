import axios from "axios";

export default async function handler(req, res) {
  const { id } = req.query;
  const url = `${process.env.URL_FUNCTIONS}/afiliaciones_aplicar?id=${id}`;

  // const output = await (await fetch(url)).json();
  await axios
    .get(url)
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((error) => {
      res
        .status(error.response.status)
        .json({ msg: error.response.data, err: error.body });
    });
}
