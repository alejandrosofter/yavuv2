import ABMColeccion from "@components/forms/ABMcollection";
import Modelo, { valoresIniciales } from "@modelos/ModeloProveedores";
import Form from "./_form";
import { fuego } from "@nandorojo/swr-firestore";

export default function Modulo({ parentData }) {
  const coleccion = `proveedors`;
  const titulo = `Proveedores`;
  const icono = `fas fa-user`;
  const order = "nombre";

  const acciones = [
    // {
    //   esFuncion: true,
    //   icono: "fas fa-business-time",
    //   label: "Movimientos",
    //   fn: (row) => {
    //     setSeleccion(row);
    //     setOpenMovimientos(true);
    //   },
    // },
  ];
  const columns = [
    {
      field: "razonSocial",
      headerName: "Razon social",
      width: 150,
    },
  ];
  return (
    <ABMColeccion
      coleccion={coleccion}
      columns={columns}
      acciones={acciones}
      orderBy={order}
      maxWidth="lg"
      where={[
        parentData
          ? ["idUsuario", "==", localStorage.getItem("usermod")]
          : ["usermod", "==", fuego.auth().currentUser?.uid],
      ]}
      // callbackclick={callbackclick}
      icono={"fas fa-users"}
      Modelo={Modelo}
      valoresIniciales={valoresIniciales}
      // dataForm={{ grupo: seleccion }}
      titulo={`PROVEEDORES`}
      Form={Form}
    />
  );
}
//getserverSideProps
