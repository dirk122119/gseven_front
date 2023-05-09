import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell,{ tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.primary.dark,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

export default function BasicTable(props:any) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow color="primary">
          <StyledTableCell>NO.</StyledTableCell>
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell align="left">MODEL</StyledTableCell>
            <StyledTableCell align="left">CATA</StyledTableCell>
            <StyledTableCell align="left">DESC</StyledTableCell>
            <StyledTableCell align="left">PRICE</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.items.map((item:any,index:number) => (
            <TableRow
              key={item.ITEM_ID}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">{index+1}</TableCell>
              <TableCell component="th" scope="row">{item.ITEM_ID}</TableCell>
              <TableCell align="left">{item.ITEM_MODEL}</TableCell>
              <TableCell align="left">{item.ITEM_CATA}</TableCell>
              <TableCell align="left">{item.ITEM_DESC}</TableCell>
              <TableCell align="left">{item.ITEM_PRICE}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
