import React, { useContext, useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import clsx from "clsx";
import GlobalServices from "./services/GlobalServices";
import { UserContext } from "./context/UserContext";
// import { Snackbar } from "@material-ui/core";
// import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";

// function Alert(props: AlertProps) {
//   return <MuiAlert elevation={6} variant="filled" {...props} />;
// }

// function Copyright() {
//   return (
//     <Typography variant="body2" color="textSecondary" align="center">
//       {"Copyright © "}
//       <Link color="inherit" href="https://material-ui.com/">
//         Your Website
//       </Link>{" "}
//       {new Date().getFullYear()}
//       {"."}
//     </Typography>
//   );
// }

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  textCenter: {
    flex: 1,
  },
  paper: {
    margin: theme.spacing(8, 4),
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  pos: {
    marginBottom: 20,
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
}));

export default function SignInSide() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const classes = useStyles();
  const [errorMessage, setErrorMessage] = useState("");

  let history = useHistory();

  const handleLogin = async () => {
    try {
      const res = await GlobalServices.login({
        username,
        password,
      });

      let resJson = await res;
      console.log(resJson);

      if (res.res === "error") {
        setErrorMessage(resJson.json.message);
      }

      if (res.res === "success") {
        userContext.setUser(resJson.json);
        sessionStorage.setItem("user", JSON.stringify(resJson.json));

        setErrorMessage("");
        history.push(`/dashboard`);
      }
    } catch (err) {
      console.log(err);
      setErrorMessage("Something Broke, Please try again or contact Admin");
    }
  };

  const handleSignUp = () => {
    history.push(`/`);
  };

  const userContext = useContext(UserContext);

  useEffect(() => {
    console.log(userContext.user);
    sessionStorage.removeItem("user");

    userContext.setUser(null);
  }, []);

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image}>
        <Typography
          component="h1"
          variant="h3"
          color="primary"
          className={classes.textCenter}
          align="center"
        >
          Your Safety Equipment. Maintained!
        </Typography>
      </Grid>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar
            alt="Remy Sharp"
            src="https://source.unsplash.com/random"
            className={clsx(classes.large, classes.pos)}
          />
          <Typography component="h1" color="primary" variant="h3">
            Sign In
          </Typography>
          <Typography component="h5" color="primary" variant="h5">
            Welcome, you can Sign In here
          </Typography>
          <br />
          <Typography color="error">{errorMessage}</Typography>
          <form
            className={classes.form}
            noValidate
            onSubmit={(ev) => ev.preventDefault()}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              value={username}
              onChange={(ev) => setUsername(ev.target.value)}
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleLogin}
            >
              Sign In
            </Button>
            <Grid container justify="space-between">
              <Grid item>
                <Link onClick={handleSignUp} variant="body2">
                  Don't have an account? Sign Up
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>{/* <Copyright /> */}</Box>
          </form>
        </div>
      </Grid>

      {/* <Snackbar open={open} autoHideDuration={6000}>
        <Alert severity="success">Login Successful!</Alert>
      </Snackbar> */}
    </Grid>
  );
}

// import { Link } from "react-router-dom";

// function Login() {
//   return (
//     <div>
//       Login
//       <Link to="/dashboard"> Try Login</Link>
//     </div>
//   );
// }

// export default Login;
