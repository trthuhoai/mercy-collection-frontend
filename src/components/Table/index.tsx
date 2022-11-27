import React from 'react';
import TableM from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

interface IProps {
  headers: {
    name: string;
    align?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
  }[];
  rows?: {
    [key: string]: any;
  }[];
}
const Table = ({ headers, rows }: IProps) => {
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td': {
      border: 0,
    },
  }));

  const StyledTableHead = styled(TableHead)(({ theme }) => ({
    '& .css-y8ay40-MuiTableCell-root': {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.common.white,
    },
  }));

  return (
    <TableContainer component={Paper} sx={{ maxHeight: 'calc(100vh - 340px)' }}>
      <TableM sx={{ minWidth: 650 }} stickyHeader aria-label="sticky table">
        <StyledTableHead>
          <TableRow>
            {headers.map(header => (
              <TableCell align={header.align || 'left'}>
                {header.name}
              </TableCell>
            ))}
          </TableRow>
        </StyledTableHead>
        <TableBody>
          {rows?.map(row => (
            <StyledTableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {Object.keys(row).map(key => (
                <TableCell align="left">{row[key]}</TableCell>
              ))}
            </StyledTableRow>
          ))}
        </TableBody>
      </TableM>
    </TableContainer>
  );
};

export default Table;
