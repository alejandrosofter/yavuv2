import { useTable } from 'react-table'
import React from 'react'
import { useEffect } from 'react';

import { TableBody,TableCell,TableHead,CssBaseline,TableRow,Table } from '@mui/material';

const TablaMui=({ columns, data })=> {
    // Use the state and functions returned from useTable to build your UI
    const { getTableProps, headerGroups, rows, prepareRow } = useTable({
      columns,
      data,
    })
  
    // Render the UI for your table
    return (
      <Table {...getTableProps()}>
        <TableHead>
          {headerGroups.map(headerGroup => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <TableCell {...column.getHeaderProps()}>
                  {column.render('Header')}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {rows.map((row, i) => {
            prepareRow(row)
            return (
              <TableRow {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <TableCell {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </TableCell>
                  )
                })}
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    )
  }
  
  export default function TablaBasica({cols,filas}) {
      console.log(filas)
      
    const columns = React.useMemo(
      () => cols,
      []
    )
  
    
  
    return (
      <div>
        <CssBaseline />
        <TablaMui columns={columns} data={filas} />
      </div>
    )
  }
  
