import Select from "@components/forms/select";
export default function Modulo({ label, campo, condiciones }) {
  // const mod=getModUsuario("pacientes")

  if (!condiciones) return "";
  return (
    <Select
      campo={campo}
      label={label}
      lista={condiciones}
      campoId="condicion"
      campoLabel={(item) => `${item.nombre}`}
    />
  );
}
