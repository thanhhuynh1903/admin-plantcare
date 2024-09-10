import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Avatar, IconButton, TableSortLabel, TablePagination } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import './EmployeeList.scss';

const statusClasses = {
  Free: 'status-free',
  Busy: 'status-busy',
  Working: 'status-working',
  'On Vacation': 'status-vacation'
};

export default function EmployeeList({employees}) {
  const [employeeData, setEmployeeData] = useState(employees);
  const [orderDirection, setOrderDirection] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleSortRequest = (property) => {
    const isAsc = orderBy === property && orderDirection === 'asc';
    const newDirection = isAsc ? 'desc' : 'asc';
    setOrderDirection(newDirection);
    setOrderBy(property);

    const sortedData = [...employeeData].sort((a, b) => {
      if (a[property] < b[property]) {
        return newDirection === 'asc' ? -1 : 1;
      }
      if (a[property] > b[property]) {
        return newDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });

    setEmployeeData(sortedData);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper} className='employees-home-employee-list'>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'name'}
                direction={orderBy === 'name' ? orderDirection : 'asc'}
                onClick={() => handleSortRequest('name')}
              >
                Name
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'email'}
                direction={orderBy === 'email' ? orderDirection : 'asc'}
                onClick={() => handleSortRequest('email')}
              >
                Email
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'status'}
                direction={orderBy === 'status' ? orderDirection : 'asc'}
                onClick={() => handleSortRequest('status')}
              >
                Status
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'role'}
                direction={orderBy === 'role' ? orderDirection : 'asc'}
                onClick={() => handleSortRequest('role')}
              >
                Role
              </TableSortLabel>
            </TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employeeData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((employee, index) => (
            <TableRow key={index}>
              <TableCell>
                <div className="employee-info">
                  <Avatar alt={employee.name} src={employee.avatar} />
                  {employee.name}
                </div>
              </TableCell>
              <TableCell>{employee.email}</TableCell>
              <TableCell className={statusClasses[employee.status]}>{employee.status}</TableCell>
              <TableCell>{employee.role}</TableCell>
              <TableCell className="action-icons">
                <IconButton aria-label="edit" className="edit">
                  <Edit />
                </IconButton>
                <IconButton aria-label="delete" className="delete">
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={employeeData.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </TableContainer>
  );
}
