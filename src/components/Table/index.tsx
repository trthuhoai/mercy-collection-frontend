import React, { useState } from 'react';
import TableM from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import TablePagination from '@mui/material/TablePagination';
import { ITEMS_PER_PAGE_TABLE } from 'constant/pagination';
import { pagination } from 'untils';

interface IProps {
  headers: {
    name: string;
    align?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
  }[];
  rows?: {
    [key: string]: any;
    onClick?: () => void;
  }[];
}
const Table = ({ headers, rows }: IProps) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(ITEMS_PER_PAGE_TABLE);

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:hover': {
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

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      <TableContainer
        component={Paper}
        sx={{ maxHeight: 'calc(100vh - 340px)' }}
      >
        <TableM stickyHeader aria-label="sticky table">
          <StyledTableHead>
            <TableRow>
              {headers.map(header => (
                <TableCell
                  align={header.align || 'left'}
                  sx={{ minWidth: 150 }}
                >
                  {header.name}
                </TableCell>
              ))}
            </TableRow>
          </StyledTableHead>
          <TableBody>
            {pagination(rows, rowsPerPage, page + 1)?.map(row => (
              <StyledTableRow
                key={row.name}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                  cursor: row.onClick && 'pointer',
                }}
                onClick={row.onClick}
              >
                {Object.keys(row).map(key => (
                  <TableCell align="left"> {row[key]}</TableCell>
                ))}
              </StyledTableRow>
            ))}
          </TableBody>
        </TableM>
      </TableContainer>
      <TablePagination
        component="div"
        count={rows?.length || 0}
        page={page}
        onPageChange={(e, page) => setPage(page)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Số hàng trên mỗi trang"
      />
    </div>
  );
};

export default Table;
