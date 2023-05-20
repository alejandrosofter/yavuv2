import { getModUsuario } from "../../../../helpers/db";
import DialogContenido from "@components/forms/dialogContenido";
import FormNuevo from "@components/cuentasCbu/nuevo";

export default function Modulo({ open, setOpen, values }) {
  const mod = getModUsuario("cuentasCbu");
  if (!mod) return "Buscando mod...";

  return (
    <DialogContenido open={open} setOpen={setOpen}>
      <FormNuevo
        preData={{ dniTitular: values.socio?.dni }}
        callbackSuccess={() => setOpen(false)}
        mod={mod}
      />
    </DialogContenido>
  );
}
