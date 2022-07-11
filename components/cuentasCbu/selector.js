import * as React from "react";

import { SearchBox } from "react-instantsearch-dom";

export default function SelectorCbu({ campo, label, callbackchange }) {
  const [datos, setDatos] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [seleccion, setSeleccion] = React.useState();

  const cambia = (e) => {
    setLoading(true);
    index
      .search(e.target.value, {
        getRankingInfo: true,
        analytics: false,
        enableABTest: false,
        hitsPerPage: 20,
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
        console.log(hits);
        setLoading(false);
      });
    // index.search(e.target.value).then(({ hits }) => {
    //   setDatos(hits);
    //   setLoading(false)
    // });
  };
  const fnCambia = (item, e) => {
    setSeleccion(item);
    if (callbackchange) callbackchange(item, e);
  };
  const labelItems = (option) =>
    `${option.apellido} ${option.nombre}  ${option.nroSocio} (${option.dni})`;

  return (
    <>
      <SearchBox />
      {/* <Select2
        label={label ? label : "Titular CBU"}
        campo={campo ? campo : "titularCbu"}
        lista={datos}
        callbackchange={fnCambia}
        campoId="id"
        campoLabel={labelItems}
      /> */}
    </>
  );
}
