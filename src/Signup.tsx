import React from "react";
import clsx from "clsx";
import {
  createStyles,
  makeStyles,
  useTheme,
  Theme,
} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid, { GridJustification } from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import AppForm from "./components/AppForm";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minWidth: 275,
    },
    margin: {
      margin: theme.spacing(12),
    },
    inMargin: {
      margin: theme.spacing(5),
    },
    bullet: {
      display: "inline-block",
      margin: "0 2px",
      transform: "scale(0.8)",
    },
    title: {
      fontSize: 14,
    },
    posUp: {
      marginTop: 20,
    },
    pos: {
      marginBottom: 20,
    },
    large: {
      width: theme.spacing(10),
      height: theme.spacing(10),
    },
  })
);

export default function Signup() {
  const classes = useStyles();

  let fields = [
    {
      name: "userName",
      required: true,
      label: "Admin Username",
      type: "email",
      placeholder: "admin@email.com",
      variant: "filled",
      disabled: false,
      defaultValue: "",
    },
    {
      name: "fullName",
      required: true,
      label: "Fullname (Surname first)",
      type: "text",
      placeholder: "Your Full Name",
      variant: "filled",
      disabled: false,
      defaultValue: "",
    },
    {
      name: "companyName",
      required: true,
      label: "Company Name",
      type: "text",
      placeholder: "Your Company Name",
      variant: "filled",
      disabled: false,
      defaultValue: "",
    },
    {
      name: "companyLogo",
      required: true,
      label: "Company Logo",
      type: "file",
      placeholder: "Your Company Logo",
      variant: "filled",
      disabled: false,
      defaultValue: "",
    },
    {
      name: "password",
      required: true,
      label: "Password",
      type: "password",
      placeholder: "Your Password",
      variant: "filled",
      disabled: false,
      defaultValue: "",
    },
    {
      name: "cpassword",
      required: true,
      label: "Confirm Password",
      type: "password",
      placeholder: "Your Password Again",
      variant: "filled",
      disabled: false,
      defaultValue: "",
    },
  ];

  let submitString = "Sign Up";
  let submitButtonPosition: GridJustification = "center";

  return (
    <Card className={clsx(classes.root, classes.margin)}>
      <CardContent className={classes.inMargin}>
        <Grid container justify="center">
          <Grid container justify="center" item xs={12}>
            <Avatar
              alt="Remy Sharp"
              src="https://source.unsplash.com/random"
              className={clsx(classes.large, classes.pos)}
            />
          </Grid>
          <Grid item xs={9} className={classes.pos}>
            <Typography
              component="h4"
              variant="h4"
              align="center"
              color="primary"
            >
              Welcome, Create Your Account Here
            </Typography>
          </Grid>
        </Grid>

        <AppForm
          fields={fields}
          submitString={submitString}
          submitButtonPosition={submitButtonPosition}
        />

        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
          className={classes.posUp}
        >
          <Typography component="h6" variant="h6">
            <Link to="/login"> Sign In</Link>
          </Typography>

          <Typography component="h6" variant="h6">
            <Link to="/login"> Administrator</Link>
          </Typography>
        </Grid>
      </CardContent>
      {/* <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
  );
}
