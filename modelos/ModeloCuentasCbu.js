import * as yup from "yup";
import { fuego } from "@nandorojo/swr-firestore";
import { getSetPermiso } from "@hooks/useUser";
export function ModeloTipoCuenta() {
  return yup.object().shape({
    nombre: yup.string().required(),
  });
}
export default function Modelo() {
  return yup.object().shape({
    titular: yup.string().required("El titular es requerido"),
    tipoCuenta: yup.string().required("Debes seleccionar el tipo de cuenta"),
    cbu: yup
      .string()
      .test("Cuit invalido", "${path} INVALIDO", async (value, testContext) => {
        const validador = require("arg.js").cbu;
        const esValido = validador.isValid(value);
        if (!esValido)
          return testContext.createError({ message: `CBU invalido` });

        return true;
      }),
  });
}
export function valoresIniciales(preData) {
  return {
    ...preData,
    titular: "",
    ...getSetPermiso("cuentasCbu"),
  };
}
function validarCuenta(cuenta) {
  if (cuenta.length != 14) {
    return false;
  }
  var digitoVerificador = cuenta[13];
  var suma =
    cuenta[0] * 3 +
    cuenta[1] * 9 +
    cuenta[2] * 7 +
    cuenta[3] * 1 +
    cuenta[4] * 3 +
    cuenta[5] * 9 +
    cuenta[6] * 7 +
    cuenta[7] * 1 +
    cuenta[8] * 3 +
    cuenta[9] * 9 +
    cuenta[10] * 7 +
    cuenta[11] * 1 +
    cuenta[12] * 3;
  var diferencia = 10 - (suma % 10);
  return diferencia == digitoVerificador;
}

function validarCodigoBanco(codigo) {
  if (codigo.length != 8) {
    return false;
  }
  var banco = codigo.substr(0, 3);
  var digitoVerificador1 = codigo[3];
  var sucursal = codigo.substr(4, 3);
  var digitoVerificador2 = codigo[7];

  var suma =
    banco[0] * 7 +
    banco[1] * 1 +
    banco[2] * 3 +
    digitoVerificador1 * 9 +
    sucursal[0] * 7 +
    sucursal[1] * 1 +
    sucursal[2] * 3;

  var diferencia = 10 - (suma % 10);

  return diferencia == digitoVerificador2;
}
function validarCBU(cbu) {
  if (cbu)
    return (
      validarLargoCBU(cbu) &&
      validarCodigoBanco(cbu.substr(0, 8)) &&
      validarCuenta(cbu.substr(8, 14))
    );
}
function validarLargoCBU(cbu) {
  if (cbu.length != 22) {
    return false;
  }
  return true;
}
