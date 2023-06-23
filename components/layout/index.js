import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";

import NextNProgress from "nextjs-progressbar";

import Head from "next/head";

import { useRouter } from "next/router";

import { useState } from "react";

import MainMenuLateral from "./menuLateral";
import MainMenuSuperior from "./menuSuperior";

import MainBodyLayout from "./body";
import Imports from "./imports";

const drawerWidth = 250;

export default function Layout({
  children,
  dataLayout = {
    titulo: "",
    acciones: [],
    components2: [],
    components: <></>,
    label: "",
    icono: "",
  },

  auth,
}) {
  // const [auxLayout, setAuxLayout] = useState({
  //   titulo: "",
  //   acciones: [],
  //   label: "",
  //   icono: "",
  // });
  // console.log(dataLayout);
  // React.useEffect(() => {
  //   if (dataLayout && dataLayout != auxLayout) setAuxLayout(dataLayout);
  // }, [dataLayout]);

  const visible = auth?.id ? true : false;
  // if (!auth.id) return children;
  const [open, setOpen] = useState(false);

  const [dialogSalir, setdialogSalir] = useState(false);
  const [openConsultas, setOpenConsultas] = React.useState(true);
  const router = useRouter();
  // React.useEffect(() => {
  //   if (open) setOpen(false);
  // }, [router.query]);
  // const accionesCuenta = [
  //   {
  //     nombre: "Cuenta",
  //     label: "Cuenta",
  //     icono: "fas fa-user",
  //     url: "",
  //     color: "",
  //   },
  //   {
  //     nombre: "Salir",
  //     label: "Salir",
  //     icono: "fas fa-sign-out-alt",
  //     fn: (auth) => {
  //       auth.signOut();
  //     },
  //     color: "",
  //   },
  // ];
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleClickConsultas = () => {
    setOpenConsultas(!openConsultas);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const clickSalir = async (e) => {
    setdialogSalir(true);
  };
  const theme = useTheme();
  return (
    <Box sx={{ display: "flex" }}>
      <Imports />

      <Head>
        <title>{dataLayout.titulo}</title>
      </Head>
      <NextNProgress
        visible={visible}
        color="#ff0081de"
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
        showOnShallow={true}
      />

      <MainMenuSuperior
        drawerWidth={drawerWidth}
        handleDrawerOpen={handleDrawerOpen}
        auth={auth}
        open={open}
        setOpen={setOpen}
        buscador={dataLayout.buscador}
        acciones={dataLayout.acciones}
        components={dataLayout.components}
        titulo={dataLayout.titulo}
        label={dataLayout.label}
        theme={theme}
      />
      <MainMenuLateral
        handleDrawerClose={handleDrawerClose}
        drawerWidth={drawerWidth}
        open={open}
        setOpen={setOpen}
        theme={theme}
      />
      <MainBodyLayout
        auth={auth}
        open={open}
        theme={theme}
        drawerWidth={drawerWidth}
        child={children}
      />
    </Box>
  );
}
