"use client";
import { useContext, useEffect, useState } from "react";
import SelectPaciente from "@components/pacientes/selectPaciente";
import useLayout from "@hooks/useLayout";
import { useRouter } from "next/router";
import { getWherePermiso } from "@hooks/useUser";
import ABMColeccion2 from "@components/forms/ABMcollection2";
import Modelo, { valoresIniciales } from "@modelos/ModeloPacientes";
import Form from "@components/pacientes/_form";
import { UseStorage } from "@hooks/useStorage";
import Link from "next/link";
import InformePacientes from "./_informe";
export function menuPacientes() {
  const ISSERVER = typeof window === "undefined";
  const idPaciente = !ISSERVER
    ? localStorage.getItem("pacienteSeleccionId")
    : null;
  return [
    { label: "Pacientes", icono: "fas fa-user", url: "/pacientes" },
    { label: "Turnos", icono: "fas fa-calendar", url: "/turnos" },
    {
      label: "Informes",
      icono: "fas fa-chart-pie",
      url: "/pacientes/informes",
    },
    { label: "Medicamentos", icono: "fas fa-medkit", url: "/medicamentos" },
    {
      label: "Consultorios",
      icono: "fas fa-house-medical",
      url: "/consultorios",
    },
    {
      label: `FICHA`,
      icono: "fas fa-id-card",
      url: `/pacientes/ficha/${idPaciente}`,
    },
  ];
}
export default function Page(props) {
  const router = useRouter();

  useLayout({
    label: "Pacientes",
    titulo: "Pacientes",
    acciones: menuPacientes(),
    components: (
      <>
        {/* <SelectPaciente
          callbackchange={(select, item) => {
            if (item) {
              localStorage.setItem("pacienteSeleccion", JSON.stringify(item));
              router.push(`/pacientes/ficha/${item.id}`);
            }
          }}
          sx={{ fontColor: "black" }}
          callbackSuccessNew={(data, item) => {
            console.log(data, item);
            // localStorage.setItem("pacienteSeleccion", JSON.stringify(item));
            // router.push(`/pacientes/ficha/${item.id}`);
          }}
          esForm={false}
        /> */}
      </>
    ),
  });
  const acciones = [
    {
      // esFuncion: true,
      // icono: "fas fa-file-medical",
      // label: "Prestaciones",
      // fn: (row) => {
      //   setSeleccion(row);
      //   setOpen(true);
      // },
    },
  ];
  const onCreateSuccess = (data, res) => {
    localStorage.setItem(
      "pacienteSeleccion",
      JSON.stringify({ ...data, id: res.id })
    );
    router.push(`/pacientes/ficha/${res.id}`);
  };
  return <InformePacientes />;
}
