import ABMColeccion2 from "@components/forms/ABMcollection2";
import Modelo, { valoresIniciales } from "@modelos/ModeloUsuariosInvitados";
import Form from "@components/usuariosInvitados/_form";
import useLayout from "@hooks/useLayout";
import { getWherePermiso } from "@hooks/useUser";
export default function Page({}) {
  useLayout({
    label: "Usuarios invitados",
    titulo: "INVITADOS",
    acciones: [],
  });
  const columns = [
    {
      accessorKey: "email",
      header: "Email",
      size: 120,
      // Cell: ({ cell }) => {
      //   return getFechaString(cell.getValue(), "DD/MM/YY | hh:mm");
      // },
    },
  ];
  let fnAcciones = [
    // {
    //   esFuncion: true,
    //   icono: "fas fa-users",
    //   label: "Inscriptos",
    //   fn: (data) => {
    //     setOpenCajaDelDia(true);
    //   },
    // },
  ];
  return (
    <ABMColeccion2
      coleccion={`usuariosInvitados`}
      columns={columns}
      acciones={fnAcciones}
      maxWidth={"lg"}
      // where={[
      //   parentData
      //     ? ["idUsuario", "==", localStorage.getItem("usermod")]
      //     : ["usermod", "==", fuego.auth().currentUser?.uid],
      // ]}
      // orderBy={order}
      // callbackclick={callbackclick}
      where={getWherePermiso("usuariosInvitados")}
      icono={"fas fa-users"}
      Modelo={Modelo}
      valoresIniciales={valoresIniciales}
      dataForm={{}}
      titulo={`CUENTAS`}
      Form={Form}
    />
  );
}
