export default function TabsTipos() {
  return (
    <Grid item md={12}>
      <TabsFormik
        label="MEDICAMENTOS"
        vistas={[
          {
            label: "medicamentos",
            nro: 0,
            vista: (
              <Grid item md={12}>
                <DataGridFormikItems
                  label="Medicamentos"
                  Modelo={ModeloMedicamentos}
                  valoresIniciales={valoresInicialesMedicamentos}
                  FormularioItem={FormMedicamentos}
                  campo="medicamentos"
                  columns={[
                    {
                      field: "label_idMedicamento",
                      headerName: "Nombre Medicamento",
                      width: 190,
                    },
                    {
                      field: "detalle",
                      headerName: "Detalle",
                      width: 390,
                    },
                  ]}
                />
              </Grid>
            ),
          },
          {
            label: "ESTUDIOS",
            nro: 1,
            vista: (
              <Grid item md={12}>
                <DataGridFormikItems
                  label="Estudios"
                  Modelo={ModeloEstudios}
                  valoresIniciales={valoresInicialesEstudios}
                  FormularioItem={FormEstudios}
                  campo="estudios"
                  columns={[
                    {
                      field: "label_idEstudio",
                      headerName: "Estudio",
                      width: 350,
                    },
                    {
                      field: "detalle",
                      headerName: "Detalle",
                      width: 350,
                    },
                  ]}
                />
              </Grid>
            ),
          },
          {
            label: "PRESTACIONES",
            nro: 2,
            vista: (
              <Grid item md={12}>
                <DataGridFormikItems
                  label=""
                  preData={{ obraSocial: values.obraSocial }}
                  Modelo={ModeloPrestaciones}
                  valoresIniciales={valoresInicialesPrestaciones}
                  FormularioItem={FormPrestaciones}
                  campo="prestaciones"
                  columns={[
                    {
                      field: "label_idPrestacion",
                      headerName: "Prestacion",
                      width: 350,
                    },
                    {
                      field: "detalle",
                      headerName: "Detalle",
                      width: 350,
                    },
                  ]}
                />
              </Grid>
            ),
          },
          {
            label: "INDICACIONES",
            nro: 3,
            vista: (
              <Grid item md={12}>
                <DataGridFormikItems
                  label=""
                  // preData={{ }}
                  Modelo={ModeloIndicacion}
                  valoresIniciales={valoresInicialesIndicacion}
                  FormularioItem={FormIndicaciones}
                  campo="indicaciones"
                  columns={[
                    {
                      field: "label_idIndicacion",
                      headerName: "Indicacion",
                      width: 450,
                    },
                  ]}
                />
              </Grid>
            ),
          },
        ]}
      />
    </Grid>
  );
}
