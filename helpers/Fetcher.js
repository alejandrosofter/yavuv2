export default async function Fetch(url, method, data) {
  const token = localStorage.getItem("token");
  const requestOptions = {
    method: method ? method : "get",
    headers: { "Content-Type": "application/json", Authorization: `${token}` },
  };
  if (data) requestOptions.body = JSON.stringify(data);
  let res = {};
  try {
    res = await fetch(url, requestOptions);
  } catch (err) {}

  return await res.json();
}
export async function postData(url = "", data = {}) {
  // Default options are marked with *
  return fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  // return response.json(); // parses JSON response into native JavaScript objects
}
