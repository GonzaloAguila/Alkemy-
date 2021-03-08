import React, {useState } from "react";
import { useDispatch} from "react-redux";
import {createUser} from "../redux/actions-creators/usersActions"
import {Link} from 'react-router-dom';

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";



const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp({history}) {
  const classes = useStyles();
  const dispatch = useDispatch()

  const [registerInput, setRegisterInput] = useState({
      email: "",
      password: "",
      name: "",
    });
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
      e.preventDefault()
      setRegisterInput({ ...registerInput, [e.target.name]: e.target.value });
    };  

  const handleSubmit = (e,user) => {
      e.preventDefault()
      setLoading(true)
      localStorage.clear()
      dispatch(createUser(user)).then(() => {
        setRegisterInput({ email: "",
        password: "",
        name: "",})
        setTimeout(() => {
          setLoading(false)
          history.push("/login")
        }, 3000)
      })}

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          ¡Bienvenido al challenge de Alkemy! Porfavor, cree una cuenta para continuar.
        </Typography>
        <form className={classes.form} onSubmit={(e) => handleSubmit(e,registerInput)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="name"
                variant="outlined"
                fullWidth
                label="Name"
                autoFocus
                onChange={handleChange}
                value={registerInput.name}
                disabled={loading ? true : false}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                label="Email"
                name="email"
                autoComplete="email"
                onChange={handleChange}
                value={registerInput.email}
                disabled={loading ? true : false}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                name="password"
                label="Password"
                type="password"
                autoComplete="current-password"
                onChange={handleChange}
                value={registerInput.password}
                disabled={loading ? true : false}
              />
            </Grid>
          </Grid>
          <br/>
            {loading ? 
            <Typography component="h1" variant="h6">Cargando...</Typography>
            : null}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={registerInput.email 
              && registerInput.password 
              && registerInput.name ? false : true}
          >
            Registrarme
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/login">
                Ya tengo una cuenta 
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
