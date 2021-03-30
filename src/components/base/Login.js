import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

import { useForm } from "react-hook-form";
import useFetch from "use-http";
import { useAuth } from "../../authentication/authUtils";

import { Redirect } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage:
      "url(https://images.pexels.com/photos/331990/pexels-photo-331990.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    margin: theme.spacing(0, 4),
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  nonFieldErros: {
    marginTop: theme.spacing(2),
  },
  loaderContainer: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
}));

export default function SignInSide() {
  const classes = useStyles();

  const { register, handleSubmit, errors } = useForm();
  const { post, response, loading, data: loginErrors } = useFetch();

  const { authToken, setAuthToken } = useAuth();

  const onSubmit = async (data) => {
    const loginData = await post("auth/login/", data);
    if (response.ok) setAuthToken(loginData.key);
  };

  if (authToken) return <Redirect to="/dashboard" />;

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
            <TextField
              error={errors.username ? true : false}
              variant="outlined"
              margin="normal"
              fullWidth
              id="username"
              label="Usuario"
              name="username"
              autoComplete="username"
              autoFocus
              inputRef={register({
                required: "Este campo es requerido",
                maxLength: {
                  value: 100,
                  message: "Demasiados caracteres",
                },
              })}
              helperText={errors.username && errors.username.message}
            />
            <TextField
              error={errors.password ? true : false}
              variant="outlined"
              margin="normal"
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
              inputRef={register({
                required: "Este campo es requerido",
                maxLength: {
                  value: 100,
                  message: "Demasiados caracteres",
                },
              })}
              helperText={errors.password && errors.password.message}
            />
            {loading && (
              <Box className={classes.loaderContainer}>
                <CircularProgress size={35} color="secondary" />
              </Box>
            )}
            {loginErrors?.non_field_errors && (
              <NonFieldErrors
                className={classes.nonFieldErros}
                errors={loginErrors.non_field_errors}
              />
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      Inevaup Negocios {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function NonFieldErrors({ className, errors }) {
  return (
    <Box className={className}>
      {errors.map((error, index) => {
        return (
          <Typography key={index} variant="body2" color="error" align="center">
            {error}
          </Typography>
        );
      })}
    </Box>
  );
}
