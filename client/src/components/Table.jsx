import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Delete from "@material-ui/icons/Delete";
import Typography from "@material-ui/core/Typography";


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  positive: {
    color: "green",
  },
  negative: {
    color: "red",
  },
});

export default function DenseTable({ operations, handleDelete,handleUpdate, updateIcon }) {
  const classes = useStyles();
 
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Concept</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Update</TableCell>
            <TableCell>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {operations.length > 0 ? (
            operations.map((operation) => (
              <TableRow key={operation.id}>
                <TableCell>{operation.concept}</TableCell>
                <TableCell>${operation.amount}</TableCell>
                <TableCell
                  className={
                    operation.type === "in"
                      ? classes.positive
                      : classes.negative}>
                {operation.type}
                </TableCell>
                <TableCell>{operation.createdAt.split("T")[0]}</TableCell>

                <TableCell>
                  <button onClick={(e) => handleUpdate(e, operation.id)}>
                    {updateIcon}
                  </button>
                </TableCell>
                <TableCell>
                   <button onClick={(e) => handleDelete(e, operation.id)}>
                    <Delete />
                  </button>
                 </TableCell>
              </TableRow>
            ))
          ) : (
            <Typography>No hay operaciones para mostrar.</Typography>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
