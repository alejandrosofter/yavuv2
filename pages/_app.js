import initAuth from "../config/initAuth"; // the module you created above
import { ThemeProvider, createTheme } from "@mui/material/styles";

import "firebase/firestore";
import "firebase/auth";
import config from "../config/_firestoreConfig";
import Fuego from "../config/fuego";
import { FuegoProvider } from "@nandorojo/swr-firestore";
import { ErrorBoundary } from "react-error-boundary";
import SnackbarFirebase from "../helpers/snackBarFirebase";
import { useEffect } from "react";

const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#006daf",
    },
    secondary: {
      main: "#ff5b00",
    },
  },
  overrides: {
    //MuiTableCell
    MuiTableRow: {
      root: {
        cursor: "pointer",
        "&:hover": {
          backgroundColor: "rgba(33, 150, 243, 0.5) !important",
        },
      },
    },
  },
  typography: {
    fontSize: 10,
    fontWeightMedium: 1000,
    htmlFontSize: 14,
    button: {
      fontWeight: 1000,
      fontSize: "0.9rem",
    },
    titulo: {
      color: "#ff5b00",
      fontSize: "0.2rem",
    },
    overline: {
      fontSize: "0.7rem",
    },
    fontWeightLight: 200,
    fontWeightRegular: 300,
  },
});
initAuth();

export default function app({ Component, pageProps }) {
  const fuego = new Fuego(config());

  return (
    <ErrorBoundary
      FallbackComponent={SnackbarFirebase}
      onError={(error, errorInfo) => console.log({ error, errorInfo })}
      onReset={() => {
        // reset the state of your app
      }}
    >
      <FuegoProvider fuego={fuego}>
        <ThemeProvider theme={theme}>
          {" "}
          <Component {...pageProps} />{" "}
        </ThemeProvider>
      </FuegoProvider>
    </ErrorBoundary>
  );
}
