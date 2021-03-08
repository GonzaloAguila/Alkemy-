import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Table from "./Table";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Button from "@material-ui/core/Button";
import Update from "@material-ui/icons/Update";
import Confirm from "@material-ui/icons/Check";

import { fetchOperations } from "../redux/actions-creators/operationsActions";
import { deleteOperation } from "../redux/actions-creators/operationsActions";

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
      justifyContent: "center",
    },
    btnContainer: {
      display: "flex",
      justifyContent: "center",
    },
  }));

  const classes = useStyles();
  const dispatch = useDispatch();
  const {operations}  = useSelector((state) => state.operationsReducer)
  const [localOperations, setLocalOperations] = useState(operations)
  const [localUser, setLocalUser] = useState({});
  const [isEditing, setisEditing] = useState(false);
  const [updateIcon, setUpdateIcon] = useState(<Update/>)

  useEffect(() => {
    const data = localStorage.getItem("loggedUser");
    const parsedData = JSON.parse(data);
    if (parsedData) {
      setLocalUser(parsedData);
      dispatch(fetchOperations(parsedData.id, null));
    }
  }, []);

  useEffect(() => {
    setLocalOperations(operations)
  }, [operations]);

  const getBalance = (operations) => {
    if (operations) {
      return operations.reduce((acc, el) => {
        if (el.type == "in") {
          return acc + el.amount;
        } else {
          return acc - el.amount;
        }
      }, 0);
    }
    return 0;
  };

  const handleBtn = (e, type) => {
    e.preventDefault();
    return type && localUser.id
      ? dispatch(fetchOperations(localUser.id, type))
      : dispatch(fetchOperations(localUser.id, null));
  };

  const handleDelete = (e, operationId) => {
    e.preventDefault();
    dispatch(deleteOperation(operationId))
    .then(() => window.location.reload());
  };

  const handleUpdate = (e, id) => {
    e.preventDefault();
    setisEditing(!isEditing);
    const itemToUpdate = operations.find((op) => op.id === id)
    isEditing ? setUpdateIcon(<Confirm />)
              : setUpdateIcon(<Update/>)
  };
  


  return (
    <Container>
      <NavBar localUser={localUser} />
      <br></br>
      <br></br>
      <Container className={classes.container}>
        <Typography
          variant="h6"
          className={
            getBalance(operations) > 0 ? classes.positive : classes.negative
          }
        >
          Balance: ${getBalance(operations)}
        </Typography>
        <Box p={2}>
          {localUser.id ? (
            <Link to="/newOperation">
              <Fab color="primary" aria-label="add">
                <AddIcon />
              </Fab>
            </Link>
          ) : null}
        </Box>
        <br></br>
        <Container className={classes.btnContainer}>
          <Button
            disabled={localUser.id ? false : true}
            onClick={(e) => handleBtn(e, "in")}
            size="small"
            variant="contained"
            color="primary"
          >
            Ver Solo Ingresos
          </Button>
          <Button
            disabled={localUser.id ? false : true}
            onClick={(e) => handleBtn(e, "out")}
            size="small"
            variant="contained"
            color="secondary"
          >
            Ver Solo Egresos
          </Button>
          <Button
            disabled={localUser.id ? false : true}
            onClick={(e) => handleBtn(e)}
            size="small"
            variant="contained"
            color="inherit"
          >
            Ver Todo
          </Button>
        </Container>
        <br></br>
        <Table 
        operations={localOperations} 
        handleDelete={handleDelete}
        handleUpdate={handleUpdate}
        updateIcon={updateIcon}
        />
        <br></br>
      </Container>
    </Container>
  );
}
