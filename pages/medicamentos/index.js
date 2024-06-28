import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Modelo, { valoresIniciales } from "@modelos/ModeloMedicamentos";

import Form from "@components/medicamentos/_form";
import ABMColeccion2 from "@components/forms/ABMcollection2";
import { getWherePermiso } from "@hooks/useUser";
import { Box, Button, Grid, Typography } from "@mui/material";
import { FileDownload } from "@mui/icons-material";

export default function PageMedicamentos({ open, setOpen, onSelect }) {
  const callbackSuccess = (data) => {
    setOpen(false);
    if (onsuccess) onsuccess(data);
  };
  const order = "nombre";
  const columns = [
    {
      accessorKey: "nombre",
      header: "Nombre",
      size: 250,
    },

    {
      accessorKey: "label_idPosologia",
      header: "Posologia",
      size: 120,
    },
    {
      accessorKey: "nombreGenerico",
      header: "Generico",
      size: 120,
    },
    {
      accessorKey: "presentacion",
      header: "Presentacion",
      size: 120,
    },
    {
      accessorKey: "estado",
      header: "Estado",
      size: 120,
    },
  ];

  const acciones = [
    // {
    //   esFuncion: true,
    //   icono: "fas fa-check",
    //   label: "Seleccionar",
    //   fn: (row) => {
    //     if (onSelect) onSelect(row);
    //     setOpen(false);
    //   },
    // },
  ];

  const handleExportRows = (rows) => {
    const doc = new jsPDF();
    const tableData = rows.map((row) =>
      columns.map((col) =>
        col.dataCell
          ? col.dataCell({ cell: { row } })
          : col.Cell
          ? col.Cell({ cell: { row } })
          : row.original[col.accessorKey]
      )
    );
    const tableHeaders = columns.map((c) => c.header);

    autoTable(doc, {
      head: [tableHeaders],
      body: tableData,
    });

    doc.save("medicamentos.pdf");
  };
  const onCreateSuccess = (data, res) => {};
  return (
    <Grid container>
      <ABMColeccion2
        coleccion={`medicamentos`}
        columns={columns}
        initialState={{ showColumnFilters: true }}
        acciones={acciones}
        order={["nombre", "asc"]}
        maxWidth="md"
        gridOptions={{
          renderTopToolbarCustomActions: ({ table }) => (
            <Box
              sx={{
                display: "flex",
                gap: "16px",
                padding: "8px",
                flexWrap: "wrap",
              }}
            >
              <Button
                disabled={table.getRowModel().rows.length === 0}
                //export all rows as seen on the screen (respects pagination, sorting, filtering, etc.)
                onClick={() =>
                  handleExportRows(table.getPrePaginationRowModel().rows)
                }
                startIcon={<FileDownload />}
              >
                Exportar
              </Button>
            </Box>
          ),
        }}
        rowsPerPage={100}
        hidePaginador={true}
        labelNuevo={"nuevo medicamento"}
        callbackSuccessNew={onCreateSuccess}
        where={getWherePermiso("medicamentos")}
        Modelo={Modelo}
        valoresIniciales={valoresIniciales}
        dataForm={{}}
        titulo={`MEDICAMENTOS`}
        Form={Form}
      />
    </Grid>
  );
}
