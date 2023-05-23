import Modelo, { valoresIniciales } from "@modelos/ModeloConfigs";
import Form from "@components/configs/_form";
import { getWherePermiso } from "@hooks/useUser";
import ABMColeccion2 from "@components/forms/ABMcollection2";
import useLayout from "@hooks/useLayout";
// import { UsePlantilla2 } from "@components/plantillas/usePlantilla2";
export default function Page({}) {
  const order = ["ref", "desc"];
  // const datos = UseConfigModulo("pacientes");
  useLayout({
    label: "Configuraciones",
    acciones: [{ label: "Configs", icono: "fas fa-cog", url: "/configs" }],
  });
  // if (!datos) return <div>Cargando...</div>;
  let fnAcciones = [
    // {
    //   esFuncion: true,
    //   icono: "fas fa-play",
    //   label: "Aplicar Afiliacion",
    //   fn: (data) => {
    //     addQueryApi("aplicarAfiliacion", data);
    //   },
    // },
  ];
  const columns = [
    {
      accessorKey: "ref",
      header: "Modulo",
      size: 400,
      //   Cell: ({ cell }) => {
      //     return getFechaString(cell.getValue(), "DD/MM | hh:mm");
      //   },
    },
    {
      accessorKey: "idUsuario",
      header: "user",
      size: 200,
      //   Cell: ({ cell }) => {
      //     return getFechaString(cell.getValue(), "DD/MM | hh:mm");
      //   },
    },
  ];

  return (
    <>
      <ABMColeccion2
        coleccion={`modulos_config`}
        columns={columns}
        acciones={fnAcciones}
        maxWidth={"lg"}
        where={getWherePermiso("modulos_config")}
        orderBy={order}
        Modelo={Modelo}
        valoresIniciales={valoresIniciales}
        dataForm={{}}
        titulo={`CONFIGS`}
        Form={Form}
      />
    </>
  );
}
