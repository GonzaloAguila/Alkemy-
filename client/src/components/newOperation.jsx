import React, { useEffect, useState } from "react";
import { useDispatch} from "react-redux";
import {createOperation} from "../redux/actions-creators/operationsActions"

import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Typography from "@material-ui/core/Typography";


export default function newOperation({history}) {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    container: {
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      justifyContent: "center",
    },
  }));
  const classes = useStyles();
  const dispatch = useDispatch()
  const [formInput, setFormInput] = useState({
      concept: "",
      amount: parseInt(undefined),
      type: "",
      date: new Date(),
      userId: null
  });

  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(createOperation(formInput))
    .then(() => history.push("/"))
  };

  const handleInput = (evt) => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    setFormInput({...formInput, [name]: newValue });
  };

  useEffect(() =>{
    const data = localStorage.getItem("loggedUser")
    const parsedData = JSON.parse(data)
    if(parsedData){
      setFormInput({...formInput, userId: parsedData.id})
    }
   },[])
  
   return (
    <Container>
      <form action="" className={classes.container} onSubmit={(e) => handleSubmit(e,formInput)}>
      <Typography variant="h5">
          Agregar nueva operación
        </Typography>
        <TextField
          label={"Concept"}
          placeholder={"Concept"}
          margin={"normal"}
          onChange={handleInput}
          value={formInput.concept}
          name="concept"
          required
        />
        <TextField
          label={"Amount"}
          placeholder={"$"}
          type="number"
          margin={"normal"}
          onChange={handleInput}
          value={formInput.amount}
          name="amount"
          required
        />
        <br/>
         <FormLabel component="legend">Type</FormLabel>
           <RadioGroup aria-label="gender" name="type" onChange={handleInput}>
             <FormControlLabel value="in" control={<Radio />} label="In" />
             <FormControlLabel value="out" control={<Radio />} label="Out" />
           </RadioGroup>
           <br/>
        <Button disabled={formInput.concept && formInput.type && formInput.amount ? false : true}
         variant="outlined" 
         className={classes.buttonColor}
         type="submit"
         >
          Agregar
        </Button>
      </form>
    </Container>
  );
}
