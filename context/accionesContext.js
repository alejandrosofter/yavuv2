// import CajaDelDia from "@components/cobros/cajaDelDia";
// import { Context, createContext, useState } from "react";
// const ContextoAcciones = createContext({});
// export default function ContextAcciones({ children }) {
//   const [openCajaDelDia, setOpenCajaDelDia] = useState(false);
//   const fns = {
//     cajaDelDia: () => {
//       setOpenCajaDelDia(true);
//     },
//   };
//   return (
//     <ContextoAcciones.Provider
//       value={{ openCajaDelDia, setOpenCajaDelDia, fns }}
//     >
//       {children}
//     </ContextoAcciones.Provider>
//   );
// }
// export { ContextoAcciones };
// context.js
import React from "react";

export const themes = {
  light: {
    foreground: "#000000",
    background: "#eeeeee",
  },
  dark: {
    foreground: "#ffffff",
    background: "#222222",
  },
};

const ThemeContext = React.createContext(themes.light);

export default ThemeContext;
