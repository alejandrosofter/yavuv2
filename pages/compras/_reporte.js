import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function Tabla({ data, cols }) {
  if (!data) return "cargando...";
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            {cols.map((col) => (
              <TableCell
                key={`col_${col.label}`}
                align={col.align ? col.align : "left"}
              >
                {col.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={`fila_${row.id}`}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {cols.map((col) => (
                <TableCell
                  key={`filaCol_${col.label}_${row[col.field]}`}
                  align={col.align ? col.align : "left"}
                >
                  {col.fn ? col.fn(row[col.field], row) : row[col.field]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
