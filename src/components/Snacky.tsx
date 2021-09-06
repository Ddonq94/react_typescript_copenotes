import React from "react";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { makeStyles, Theme } from "@material-ui/core/styles";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function Snacky({ handle, type, message }: any) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const setAlert = (type: string) => {
    let alert;
    if (type === "success") {
      alert = (
        <Alert onClose={handleClose} severity="success">
          This is a success message!
        </Alert>
      );
    } else if (type === "error") {
      alert = (
        <Alert onClose={handleClose} severity="error">
          This is a success message!
        </Alert>
      );
    } else if (type === "warning") {
      alert = (
        <Alert onClose={handleClose} severity="warning">
          This is a success message!
        </Alert>
      );
    } else if (type === "info") {
      alert = (
        <Alert onClose={handleClose} severity="info">
          This is a success message!
        </Alert>
      );
    }
    // else {
    alert = (
      <Snackbar open={handle} autoHideDuration={6000} onClose={handleClose}>
        {alert}
      </Snackbar>
    );
    // }

    return alert;
  };

  console.log("snacky", type);

  return (
    <div className={classes.root}>
      {/* <Button variant="outlined" onClick={handleClick}>
        Open success snackbar
      </Button> */}

      {type && setAlert(type)}

      {/* <Alert severity="error">This is an error message!</Alert>
      <Alert severity="warning">This is a warning message!</Alert>
      <Alert severity="info">This is an information message!</Alert>
      <Alert severity="success">This is a success message!</Alert> */}
    </div>
  );
}
