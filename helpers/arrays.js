import { formatMoney } from "./numbers";

export function getLabelColeccion({ data, valor, campoId, campoLabel }) {
  const i = data.map((x) => x[campoId]).indexOf(valor);
  if (i > 0) return data[i][campoLabel];
  return "s/n";
}
export function getItemObject({ data, keyBusca }) {
  for (const key in data) if (key === keyBusca) return data[key];

  return null;
}
export function getItemArray({ data, valor, campoId }) {
  if (data) {
    campoId = campoId ? campoId : "id";
    const i = data.map((x) => x[campoId]).indexOf(valor);

    if (i >= 0) return data[i];
    return null;
  }
  return null;
}
export function getIndexArray({ data, valor, campoId }) {
  if (data) {
    campoId = campoId ? campoId : "id";
    const i = data.map((x) => x[campoId]).indexOf(valor);

    if (i >= 0) return i;
    return null;
  }
  return null;
}
export function getItemArrayKey({ data, key }) {
  let aux;
  data.forEach((item, keyObj, map) => {
    if (keyObj === key) aux = item;
  });

  return aux;
}
export function contadorMoney(arr, campo = "importe") {
  let total = 0;
  if (!arr) return formatMoney(total);
  arr.forEach((item) => {
    total += Number(item[campo]);
  });
  return formatMoney(total);
}
export function contador(arr, campo = "importe") {
  let total = 0;
  if (!arr) return total;
  arr.forEach((item) => {
    total += Number(item[campo]);
  });
  return total;
}
export function contador2(arr, fn, campo = "importe") {
  let total = 0;
  if (!arr) return total;
  arr.forEach((item) => {
    total += fn ? fn(item) : Number(item[campo]);
  });
  return total;
}
export function orderArray(arr, campo) {
  //order array by campo
  return arr
    .sort((a, b) => {
      if (a[campo] < b[campo]) return -1;
      if (a[campo] > b[campo]) return 1;
      return 0;
    })
    .map((item) => {
      return item;
    });
}
export function localstorageParser(key) {
  if (typeof window !== "undefined") {
    const item = localStorage.getItem(key);

    return item ? JSON.parse(item) : null;
  }
  return;
}
export function groupBy(list, keyGetter) {
  const map = new Map();
  list.forEach((item) => {
    const key = keyGetter(item);
    const collection = map.get(key);
    if (!collection) {
      map.set(key, [item]);
    } else {
      collection.push(item);
    }
  });
  return map;
}

export function getIndexItemArray({ data, valor, campoId }) {
  if (data) {
    campoId = campoId ? campoId : "id";
    const i = Array.isArray(valor)
      ? valor
          .map((item) => data.map((x) => x[campoId]).indexOf(item))
          .reduce((prev, actual) => {
            if (prev > 0) return prev;
            if (actual > 0) return actual;
            return 0;
          })
      : data.map((x) => x[campoId]).indexOf(valor);

    if (i >= 0) return i;
    return null;
  }
  return null;
}
