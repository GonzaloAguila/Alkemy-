import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import { useDispatch, useSelector } from "react-redux";
import {Link} from "react-router-dom"

import { makeStyles } from "@material-ui/core/styles";
import Box from '@material-ui/core/Box';
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Table from "./Table";
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';

import {fetchOperations} from "../redux/actions-creators/operationsActions"

export default function Home() {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    buttonColor: {
      color: "white",
    },
    positive: {
      color: "green",
      textAlign: "center",

    },
    negative: {
      color: "red",
      textAlign: "center",
    },
    container: {
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",    }
  }));
  const classes = useStyles();
  const dispatch = useDispatch()
  const {operations} = useSelector((state) => state.operationsReducer)
  const [localUser, setLocalUser] = useState({})

  useEffect(() =>{
    const data = localStorage.getItem("loggedUser")
    const parsedData = JSON.parse(data)
    if(parsedData){
     setLocalUser(parsedData)
     dispatch(fetchOperations(parsedData.id))
    }
   },[])
 

  const getBalance = (operations) => {
    return operations.reduce((acc, el) => {
      if (el.type == "in") {
        return acc + el.amount;
      } else {
        return acc - el.amount;
      }
    }, 0);
  };

  return (
    <Container>
      <NavBar localUser={localUser}/>
      <br></br>
      <br></br>
      <Container className={classes.container}>
        <Typography variant="h6" className={getBalance(operations) > 0 
            ? classes.positive 
            : classes.negative}>
          Balance: ${getBalance(operations)}
        </Typography>
        <Box p={2}>
        <Link to="/newOperation"> 
        <Fab color="primary" aria-label="add" >
        <AddIcon />
        </Fab>
        </Link>   
        </Box>
        <br></br>
        <br></br>
        <Table operations={operations} />
      </Container>
    </Container>
  );
}
