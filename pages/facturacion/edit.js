import DialogContenido from "@components/forms/dialogContenido";
import FormFacturacion from "./_form";
import { update } from "@nandorojo/swr-firestore";

export function EditFacturacionItem({ data, open, setOpen, onEdit }) {
  const onAccept = (data) => {
    console.log(data);
    delete data.__snapshot;
    delete data.usermod;
    update(`/recetasFacturacion/${data.id}`, data).then(() => {
      setOpen(false);
      if (onEdit) onEdit(data);
    });
  };
  return (
    <DialogContenido titulo={"Editar Item"} open={open} setOpen={setOpen}>
      <FormFacturacion onAccept={onAccept} initialValues={data} />
    </DialogContenido>
  );
}
