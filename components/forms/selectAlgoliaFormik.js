import * as React from "react";
import { IconButton, Box, Grid, Icon, Typography, Stack } from "@mui/material";

import algoliasearch from "algoliasearch/lite";
import AutoCompleteAsync from "../forms/autocompleteAsync";

import { Field } from "formik";
import { FormControl, TextField } from "@mui/material";
import { fuego } from "@nandorojo/swr-firestore";

const SelectFormikAlgolia = ({
  label,
  campo,
  autoFocus,
  coleccionAlgolia,
  callbackchange,
  labelItems,
  initLabel,
}) => {
  const [datos, setDatos] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const containerRef = React.useRef(null);
  const [showBusca, setShowBusca] = React.useState(false);
  const [labelSelect, setLabel] = React.useState(initLabel);
  React.useEffect(() => {}, []);
  return (
    <FormControl fullWidth>
      <Field label={label} name={campo} id={campo}>
        {(props) => {
          if (!props.field.value) setShowBusca(true);
          setLabel(`${props.form.values?.[`label_${campo}`]}`);
          const client = algoliasearch(
            "YEIGHXO1BF",
            "0e2670dbc0a23a0a5da70aef369d176b"
          );
          const index = client.initIndex(coleccionAlgolia);
          // setSeleccion({lab})
          const cambia = (e) => {
            setLoading(true);

            // props.form.values.label_cliente
            index
              .search(e.target.value, {
                getRankingInfo: true,
                analytics: false,
                enableABTest: false,
                hitsPerPage: 20,
                facetFilters: [["idUsuario", fuego.auth().currentUser.uid]],
                attributesToRetrieve: "*",
                attributesToSnippet: "*:20",
                snippetEllipsisText: "…",
                responseFields: "*",
                explain: "*",
                page: 0,
                facets: ["*"],
              })
              .then(({ hits }) => {
                setDatos(hits);
                setLoading(false);
              });
            // index.search(e.target.value).then(({ hits }) => {
            //   setDatos(hits);
            //   setLoading(false)
            // });
          };
          const clickLabel = () => {
            setShowBusca(!showBusca);
          };
          const fnClick = (item, e) => {
            if (callbackchange) callbackchange(item);
            props.form.setFieldValue(`${campo}`, `${item.objectID}`);
            props.form.setFieldValue(`label_${campo}`, labelItems(item));
            setLabel(labelItems(item));
            setShowBusca(!showBusca);
          };

          return (
            <Grid
              alignItems={"center"}
              alignContent="center"
              spacing={2}
              container
            >
              <Grid item md={11} sx={{ display: `${showBusca ? "" : "none"}` }}>
                <AutoCompleteAsync
                  inputRef={
                    autoFocus ? (input) => input && input.focus() : null
                  }
                  icono="fas fa-user"
                  label={label ? label : "Buscador"}
                  fnCambia={cambia}
                  fnClick={fnClick}
                  loading={loading}
                  datos={datos}
                  labelItems={labelItems}
                />
              </Grid>
              <Grid
                item
                sx={{ pt: 1, display: `${showBusca ? "" : "none"}` }}
                md={1}
              >
                <IconButton
                  onClick={clickLabel}
                  size="small"
                  variant="outlined"
                >
                  <Icon className="fas fa-times" />
                </IconButton>
              </Grid>

              <Grid
                md={11}
                item
                spacing={2}
                sx={{ display: `${!showBusca ? "" : "none"}` }}
              >
                <Typography sx={{ pt: 1 }} variant="caption">
                  {label}
                </Typography>
                <Typography
                  onClick={clickLabel}
                  sx={{ pt: 1, color: "blue", cursor: "pointer" }}
                  variant="h5"
                >
                  {labelSelect === "undefined"
                    ? initLabel
                      ? initLabel
                      : "Seleccione..."
                    : labelSelect}
                </Typography>
              </Grid>
              <Grid
                sx={{ pt: 3, display: `${!showBusca ? "" : "none"}` }}
                md={1}
              ></Grid>
            </Grid>
          );
        }}
      </Field>
      <Field type="hidden" name={`label_${campo}`} id={`label_${campo}`} />
    </FormControl>
  );
};

export default SelectFormikAlgolia;
