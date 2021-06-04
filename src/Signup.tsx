import React, { useState } from "react";
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
import { Link, useHistory } from "react-router-dom";
import GlobalServices from "./services/GlobalServices";

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

  const [userName, setUserName] = useState("");
  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyLogo, setCompanyLogo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  let history = useHistory();

  const fields = [
    {
      name: "userName",
      value: userName,
      required: true,
      label: "Admin Username",
      type: "email",
      placeholder: "admin@email.com",
      variant: "filled",
      setter: setUserName,
      disabled: false,
      defaultValue: "",
    },
    {
      name: "fullName",
      value: fullName,
      required: true,
      label: "Fullname (Surname first)",
      type: "text",
      placeholder: "Your Full Name",
      variant: "filled",
      setter: setFullName,
      disabled: false,
      defaultValue: "",
    },
    {
      name: "companyName",
      value: companyName,
      required: true,
      label: "Company Name",
      type: "text",
      placeholder: "Your Company Name",
      variant: "filled",
      setter: setCompanyName,
      disabled: false,
      defaultValue: "",
    },
    {
      name: "companyLogo",
      value: companyLogo,
      required: true,
      label: "Company Logo",
      type: "file",
      placeholder: "Your Company Logo",
      variant: "filled",
      setter: setCompanyLogo,
      disabled: false,
      defaultValue: "",
    },
    {
      name: "password",
      value: password,
      required: true,
      label: "Password",
      type: "password",
      placeholder: "Your Password",
      variant: "filled",
      setter: setPassword,
      disabled: false,
      defaultValue: "",
    },
    {
      name: "cpassword",
      value: confirmPassword,
      required: true,
      label: "Confirm Password",
      type: "password",
      placeholder: "Your Password Again",
      variant: "filled",
      setter: setConfirmPassword,
      disabled: false,
      defaultValue: "",
    },
  ];

  const handleSignup = async () => {
    console.log("submit");

    try {
      const res = await GlobalServices.addNewCompany({
        name: companyName,
        logo_url: companyLogo,
        status: 1,
      });
      let resJson = await res;
      console.log(resJson);
      if (res.res === "error") {
        setErrorMessage(
          "Something Went Wrong, Please try again or contact Admin"
        );
      }

      if (res.res === "success") {
        const resUser = await GlobalServices.signup({
          name: fullName,
          email: userName,
          password: password,
          password_confirmation: confirmPassword,
          company_id: resJson.json.id,
          area_id: 0,
          location_id: 0,
          type: "company",
          status: 1,
        });

        let resUserJson = await resUser;
        console.log(resUserJson);

        if (resUserJson.res === "error") {
          setErrorMessage(
            "Something Went Wrong, Please try again or contact Admin"
          );
        }

        if (resUser.res === "success") {
          sessionStorage.setItem("user", JSON.stringify(resJson.json));
          setErrorMessage("");
          history.push(`/login`);
        }
      }
    } catch (err) {
      console.log(err);
      setErrorMessage("Something Broke, Please try again or contact Admin");
    }
  };

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

        <Typography align="center" color="error">
          {errorMessage}
        </Typography>

        <AppForm
          fields={fields}
          submitString={submitString}
          submitButtonPosition={submitButtonPosition}
          submitButtonMethod={handleSignup}
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
