import React, { useState } from "react";
import { useDispatch} from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import Update from "@material-ui/icons/Update";
import Confirm from "@material-ui/icons/Check";
import Delete from "@material-ui/icons/Delete";
import { TextField } from "@material-ui/core";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

import { deleteOperation, updateOperation } from "../redux/actions-creators/operationsActions";


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
  

export const Operation = ({ operation }) => {
 
const classes = useStyles()  
const dispatch = useDispatch()

const [isEditing, setisEditing] = useState(false);  
const [input, setInput] = useState({
    amount: "",
    concept: ""
})

const handleDelete = (e, operationId) => {
    e.preventDefault();
    dispatch(deleteOperation(operationId))
    .then(() => window.location.reload());
  };
  
  const handleUpdate = (e, id) => {
    e.preventDefault();
    setisEditing(!isEditing);
    if(e.currentTarget.id === "confirm"){
      dispatch(updateOperation({
          id,
          concept: input.concept,
          amount: Number(input.amount)
      })).then(() => window.location.reload());
    }
    return 
  };

  const handleChange = (e) => {
    setInput({...input, [e.target.name] : e.target.value})
  }

  return (
    <TableRow key={operation.id}>
      {!isEditing ? (
        <>
          <TableCell>{operation.concept}</TableCell>
          <TableCell>${operation.amount}</TableCell>
        </>
      ) : (
        <>
          <TableCell>
            <TextField 
            onChange={handleChange} 
            placeholder={operation.concept}
            value={input.concept}
            name="concept"
            type="text"
            >
            {operation.concept}
            </TextField>
          </TableCell>
          <TableCell>
            <TextField onChange={handleChange}
             placeholder={operation.amount}
             value={input.amount}
             name="amount"
             type="number"
             >
            ${operation.amount}
            </TextField>
          </TableCell>
        </>
      )}
      <TableCell
        className={
          operation.type === "in" ? classes.positive : classes.negative
        }
      >
        {operation.type}
      </TableCell>
      <TableCell>{operation.createdAt.split("T")[0]}</TableCell>
      {isEditing ? (
        <TableCell>
          <button 
          disabled={input.amount && input.concept ? false : true} 
          id="confirm" 
          onClick={(e) => handleUpdate(e, operation.id)}>
          <Confirm />
          </button>
        </TableCell>
      ) : (
        <TableCell>
          <button 
          id="update" 
          onClick={(e) => handleUpdate(e, operation.id)}>
            <Update/>
          </button>
        </TableCell>
      )}

      <TableCell>
        <button onClick={(e) => handleDelete(e, operation.id)}>
          <Delete />
        </button>
      </TableCell>
    </TableRow>
  );
};
