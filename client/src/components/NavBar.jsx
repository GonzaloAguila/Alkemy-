import React from "react";
import { Link } from "react-router-dom";

import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/Appbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/core/Menu";

export default function NavBar({ localUser }) {
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
  }));
  const classes = useStyles();

  const handleLogOut = () =>{
    localStorage.clear()
    alert("Deslogeado correctamente, gracias por tu visita.")
    window.location.reload()
  }

  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {localUser.name
              ? `Logeado como: ${localUser.name}`
              : "Inicia sesion para ver tus operaciones."}
          </Typography>
          {localUser.name ? (
            <Button variant="outlined" className={classes.buttonColor} onClick={handleLogOut}>
              LogOut
            </Button>
          ) : (
            <>
              <Link to="/register">
                <Button variant="outlined" className={classes.buttonColor}>
                  Registrarse
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outlined" className={classes.buttonColor}>
                  Login
                </Button>
              </Link>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Container>
  );
}
