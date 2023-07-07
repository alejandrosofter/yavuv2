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

  if (tipo === "EMPRESA") {
    cuilStr = "30" + dni.toString();
  } else {
    let generoNum = tipo === "MASCULINO" ? 20 : 27;
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
export function getCuilCuit(document_number, gender) {
  /**
   * Cuil format is: AB - document_number - C
   * Author: Nahuel Sanchez, Woile
   *
   * @param {str} document_number -> string solo digitos
   * @param {str} gender -> debe contener HOMBRE, MUJER o SOCIEDAD
   *
   * @return {str}
   **/
  "use strict";
  const HOMBRE = ["HOMBRE", "M", "MALE", "MASCULINO"],
    MUJER = ["MUJER", "F", "FEMALE", "FEMENINO"],
    SOCIEDAD = ["SOCIEDAD", "S", "SOCIETY", "EMPRESA"];
  let AB, C;

  /**
   * Verifico que el document_number tenga exactamente ocho numeros y que
   * la cadena no contenga letras.
   */
  if (document_number.length != 8 || isNaN(document_number)) {
    if (document_number.length == 7 && !isNaN(document_number)) {
      document_number = "0".concat(document_number);
    } else {
      // Muestro un error en caso de no serlo.
      return "El numero de dni ingresado no es correcto.";
    }
  }

  /**
   * De esta manera permitimos que el gender venga en minusculas,
   * mayusculas y titulo.
   */
  gender = gender.toUpperCase();

  // Defino el valor del prefijo.
  if (HOMBRE.indexOf(gender) >= 0) {
    AB = "20";
  } else if (MUJER.indexOf(gender) >= 0) {
    AB = "27";
  } else {
    AB = "30";
  }

  /*
   * Los numeros (excepto los dos primeros) que le tengo que
   * multiplicar a la cadena formada por el prefijo y por el
   * numero de document_number los tengo almacenados en un arreglo.
   */
  const multiplicadores = [3, 2, 7, 6, 5, 4, 3, 2];

  // Realizo las dos primeras multiplicaciones por separado.
  let calculo = parseInt(AB.charAt(0)) * 5 + parseInt(AB.charAt(1)) * 4;

  /*
   * Recorro el arreglo y el numero de document_number para
   * realizar las multiplicaciones.
   */
  for (let i = 0; i < 8; i++) {
    calculo += parseInt(document_number.charAt(i)) * multiplicadores[i];
  }

  // Calculo el resto.
  let resto = parseInt(calculo) % 11;

  /*
   * Llevo a cabo la evaluacion de las tres condiciones para
   * determinar el valor de C y conocer el valor definitivo de
   * AB.
   */
  if (SOCIEDAD.indexOf(gender) < 0 && resto == 1) {
    if (HOMBRE.indexOf(gender) >= 0) {
      C = "9";
    } else {
      C = "4";
    }
    AB = "23";
  } else if (resto === 0) {
    C = "0";
  } else {
    C = 11 - resto;
  }
  const example = `${AB}-${document_number}-${C}`;
  // Show example
  console.log(example);

  // Generate cuit
  const cuil_cuit = `${AB}${document_number}${C}`;
  return cuil_cuit;
}
