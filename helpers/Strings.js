export function getLinkUrl(link, modulo, data, esFuncion) {
  try {
    if (esFuncion) return "#";
    if (!link) return "#";
    return eval("`" + link + "`");
  } catch (err) {
    console.error("erro creacion link menu", modulo);
    return "";
  }
}
export function getStringField({ obj, field, upper }) {
  if (!obj) return "";
  if (field in obj) return upper ? obj[field].toUpperCase() : obj[field];
}
export function utf8_to_b64(str) {
  return window.btoa(unescape(encodeURIComponent(str)));
}
export function capitalize(str) {
  if (!str) return "";
  return str
    .trim()
    .toLowerCase()
    .replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()));
}
export function calcularCuil(tipo, dni) {
  console.log("calcularCuil", tipo, dni);
  // Verificar que el tipo sea válido
  if (tipo !== "MASCULINO" && tipo !== "FEMENINO" && tipo !== "EMPRESA") {
    return "El tipo ingresado no es válido.";
  }

  // Verificar que el DNI sea un número válido de 8 dígitos
  if (isNaN(dni) || dni.toString().length !== 8) {
    return "El DNI ingresado no es válido.";
  }

  // Calcular el número de CUIL
  let cuilStr = "";

  if (tipo === "empresa") {
    cuilStr = "30" + dni.toString();
  } else {
    let generoNum = tipo === "masculino" ? 20 : 27;
    cuilStr = generoNum.toString() + dni.toString();
  }

  cuilStr += calcularDigitoVerificador(cuilStr);

  return Number(cuilStr);
}

export function calcularDigitoVerificador(cuil) {
  // Calcular el dígito verificador utilizando el algoritmo del Módulo 11
  let acumulado = 0;
  const coeficientes = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2];

  for (let i = 0; i < coeficientes.length; i++) {
    acumulado += parseInt(cuil / Math.pow(10, 10 - i), 10) * coeficientes[i];
    cuil %= Math.pow(10, 10 - i);
  }

  let digitoVerificador = 11 - (acumulado % 11);
  if (digitoVerificador === 11) {
    digitoVerificador = 0;
  } else if (digitoVerificador === 10) {
    digitoVerificador = 9;
  }

  return digitoVerificador.toString();
}
