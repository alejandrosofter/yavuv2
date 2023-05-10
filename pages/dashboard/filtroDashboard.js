import Select2Simple from "@components/forms/select2Simple";

export default function FiltroDashboard({ tipoFiltro, callbackchange }) {
  switch (tipoFiltro) {
    case "DIARIO":
      return (
        <Select2Simple
          callbackchange={callbackchange}
          campo="fecha"
          label="Fecha"
          lista={[
            { id: "HOY", nombre: "Hoy" },
            { id: "AYER", nombre: "Ayer" },
            { id: "ULTIMOS_7_DIAS", nombre: "Ultimos 7 dias" },
            { id: "ULTIMOS_30_DIAS", nombre: "Ultimos 30 dias" },
            { id: "ULTIMOS_90_DIAS", nombre: "Ultimos 90 dias" },
            { id: "ULTIMOS_365_DIAS", nombre: "Ultimos 365 dias" },
          ]}
          campoId="id"
          campoLabel="nombre"
        />
      );

    case "MENSUAL":
      return (
        <Select2Simple
          callbackchange={callbackchange}
          campo="fecha"
          label="Fecha"
          lista={[
            { id: "MES_ACTUAL", nombre: "Mes Actual" },
            { id: "MES_ANTERIOR", nombre: "Mes Anterior" },
            { id: "ULTIMOS_3_MESES", nombre: "Ultimos 3 meses" },
            { id: "ULTIMOS_6_MESES", nombre: "Ultimos 6 meses" },
            { id: "ULTIMOS_12_MESES", nombre: "Ultimos 12 meses" },
          ]}
          campoId="id"
          campoLabel="nombre"
        />
      );
    case "ANUAL":
      return (
        <Select2Simple
          callbackchange={callbackchange}
          campo="fecha"
          label="Fecha"
          lista={[
            { id: "ANIO_ACTUAL", nombre: "Año Actual" },
            { id: "ANIO_ANTERIOR", nombre: "Año Anterior" },
            { id: "ULTIMOS_3_ANIOS", nombre: "Ultimos 3 años" },
            { id: "ULTIMOS_5_ANIOS", nombre: "Ultimos 5 años" },
            { id: "ULTIMOS_10_ANIOS", nombre: "Ultimos 10 años" },
          ]}
          campoId="id"
          campoLabel="nombre"
        />
      );
    default:
      return "";
  }
}
