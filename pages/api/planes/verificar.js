import {
  findOne,
  findOneField,
  findWhere,
  findMods,
  nuevo,
  update,
} from "../../../config/firebase";
import Ensesion from "../../../helpers/EnSesion";

async function getModulos(plan, idUsuario) {
  var sal = [];

  const array = await findOne("planes", plan, idUsuario);
  return await findMods("mods", "idModulo", array.modulos, idUsuario);
  for (let index = 0; index < array.modulos.length; index++) {
    const idModulo = array.modulos[index];
    const where = [
      { campo: "idModulo", valor: idModulo },
      { campo: "IdUsuario", valor: idUsuario },
    ];
    const auxMod = await findWhere("mods", where, true);
    const modulo = await findOne("modulos", idModulo);
    sal.push({ modulo: modulo, mod: auxMod });
  }

  return sal;
}
function estaCargado(idModulo, idUsuario, arr) {
  let cargado = false;
  arr.map((modItem) => {
    if (modItem.idModulo == idModulo && modItem.idUsuario == idUsuario) {
      cargado = true;
      return;
    }
  });
  return cargado;
}
function getIdMod(idModulo, idUsuario, arr) {
  let id = false;
  arr.map((modItem) => {
    if (modItem.idModulo == idModulo && modItem.idUsuario == idUsuario) {
      id = modItem.id;
      return;
    }
  });
  return id;
}
async function cargarMod(idModulo, idUsuario, estaBaja) {
  const modulo = await findOne("modulos", idModulo);
  await nuevo("mods", {
    idUsuario,
    idModulo,
    fechaClick: new Date(),
    estado: true,
    esBase: false,
  });
}
async function bajarMod(idMod) {
  const obj = { id: idMod, estado: false };
  //
  await update("mods", obj);
}
async function subirMod(idMod) {
  const obj = { id: idMod, estado: true };

  await update("mods", obj);
}
async function estaBaja(idMod, arr) {
  let cargado = false;
  arr.map((modItem) => {
    if (modItem.id == idMod) {
      cargado = true;
      return;
    }
  });
  return cargado;
}
async function bajarMods(mods) {
  mods.map(async (item) => {
    await bajarMod(item.id);
  });
}
const ejecuta = async ({ user }) => {
  var salida = [];
  const idUsuario = user.id;
  const cuenta = await findOneField("cuentas", {
    campo: "idUsuario",
    valor: idUsuario,
  });
  const plan = await findOne("planes", cuenta.plan);

  if (plan) {
    const modsUsuario = await findMods("mods", idUsuario);
    bajarMods(modsUsuario);
    plan.modulos.map(async (idModulo) => {
      if (!estaCargado(idModulo, idUsuario, modsUsuario))
        await cargarMod(idModulo, idUsuario);
      const idMod = getIdMod(idModulo, idUsuario, modsUsuario);
      if (estaBaja(idMod, modsUsuario)) {
        if (idMod) await subirMod(idMod);
      }
      // else await bajarMod(getIdMod(idModulo,idUsuario,modsUsuario))
    });
  }

  return salida;
};
export default async function handler(req, res) {
  const { id } = req.query;
  const data = req.body;

  const [salida, codigoSalida] = await Ensesion({ req, res, ejecuta }).catch(
    (err) => {
      throw err;
    }
  );

  res.status(codigoSalida).json(salida);
}
