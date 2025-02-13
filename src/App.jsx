import React, { useState } from "react";
import { Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Paper,
   TableSortLabel, TextField, FormGroup, FormControlLabel, Checkbox } from "@mui/material";

const initialColumns = [
  { id: "id", label: "ID", show: true },
  { id: "name", label: "Name", show: true },
  { id: "age", label: "Age", show: true },
  { id: "mail", label: "mail", show: true },
  { id: "fname", label: "FName", show: true },
  { id: "aage", label: "AAge", show: true },
  { id: "email", label: "Email", show: true },

];

const initialData = [
  { id: 1, name: "Alice", age: 25, mail: "alice@example.com", fname: "Alice", aage: 25, email: "alice@example.com"  },
  { id: 2, name: "Bob", age: 30, email: "bob@example.com" , mail: "alice@example.com", fname: "Alice", aage: 25},
  { id: 3, name: "Charlie", age: 35, email: "charlie@example.com" , mail: "alice@example.com", fname: "Alice", aage: 25},
  { id: 4, name: "David", age: 28, email: "david@example.com" , mail: "alice@example.com", fname: "Alice", aage: 25},
  { id: 1, name: "Alice", age: 25, email: "alice@example.com", mail: "alice@example.com", fname: "Alice", aage: 25 },
  { id: 2, name: "Bob", age: 30, email: "bob@example.com" , mail: "alice@example.com", fname: "Alice", aage: 25},
  { id: 3, name: "Charlie", age: 35, email: "charlie@example.com" , mail: "alice@example.com", fname: "Alice", aage: 25},
];

import './App.css'

function App() {
  const [columns, setColumns] = useState(initialColumns);
  const [data, setData] = useState(initialData);
  const [search, setSearch] = useState("");
  const [sortColumn, setSortColumn] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");

  // Handle Sorting
  const handleSort = (columnId) => {
    const isAsc = sortColumn === columnId && sortOrder === "asc";
    setSortColumn(columnId);
    setSortOrder(isAsc ? "desc" : "asc");

    const sortedData = [...data].sort((a, b) => {
      if (a[columnId] < b[columnId]) return isAsc ? -1 : 1;
      if (a[columnId] > b[columnId]) return isAsc ? 1 : -1;
      return 0;
    });

    setData(sortedData);
  };

  // Handle Column Selection (Add/Delete)
  const handleColumnToggle = (id) => {
    setColumns(columns.map(col => col.id === id ? { ...col, show: !col.show } : col));
  };

  // Filtered Data (Search Functionality)
  const filteredData = data.filter(row =>
    columns.some(col => row[col.id]?.toString().toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <>
   <div className="fullwidth">
      {/* Search Input */}
      <TextField 
        label="Search" 
        variant="outlined" 
        size="small" 
        onChange={(e) => setSearch(e.target.value)} 
        style={{ marginBottom: 10, width: "50%" }}
      />

      {/* Column Selector */}
      <FormGroup row>
        {initialColumns.map((col) => (
          <FormControlLabel
            key={col.id}
            control={<Checkbox checked={columns.find(c => c.id === col.id)?.show || false} onChange={() => handleColumnToggle(col.id)} />}
            label={col.label}
          />
        ))}
      </FormGroup>

      {/* Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.filter(col => col.show).map((col) => (
                <TableCell key={col.id}>
                  <TableSortLabel
                    active={sortColumn === col.id}
                    direction={sortColumn === col.id ? sortOrder : "asc"}
                    onClick={() => handleSort(col.id)}
                  >
                    {col.label}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((row, index) => (
              <TableRow key={row.id} style={{ backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#e0e0e0" }}>
                {columns.filter(col => col.show).map((col) => (
                  <TableCell key={col.id}>{row[col.id]}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
    </>
  )
}

export default App
