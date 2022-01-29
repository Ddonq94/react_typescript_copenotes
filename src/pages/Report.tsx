import React, { useEffect, useState } from "react";
import AppFrame from "../components/AppFrame";

import usefulServices from "../services/usefulServices";
import GlobalServices from "../services/GlobalServices";

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  Grid,
  Button,
  LinearProgress,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { Alert } from "@material-ui/lab";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: "19vw",
    },
    media: {
      height: 150,
    },
    bottom: {
      marginBottom: "20px",
    },
    secondHeading: {
      fontSize: theme.typography.pxToRem(20),
      color: theme.palette.text.secondary,
      marginBottom: "2vh",
      marginTop: "2vh",
    },
  })
);

function Report() {
  const [user, setUser] = useState<any>();
  const [loading, setLoading] = useState(false);

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const [errorMessage, setErrorMessage] = useState("");

  const [handle, setHandle] = useState(false);
  const [type, setType] = useState<any>();
  const [msg, setMsg] = useState("");

  let history = useHistory();

  let reports = [
    {
      title: "Equipments",
      subTitle: "Shows all equipments and key information about each",
      img: 1,
      val: "ge",
    },
    {
      title: "Current Inspection Info",
      subTitle: "Shows most recent inspection info for each equipment",
      img: 0,
      val: "cii",
    },
    {
      title: "Locations",
      subTitle: "Shows all locations and information about each",
      img: 5,
      val: "gl",
    },
  ];

  const handleReportClick = async (id: any) => {
    let endPoint = "";

    switch (id) {
      case "ge":
        endPoint = "getEquipmentReport";
        break;
      case "cii":
        endPoint = "getCurrentInspectionInfo";
        break;
      case "gl":
        endPoint = "getLocationsReport";
    }

    setLoading(true);

    try {
      const res = await GlobalServices.generic(null, "GET", endPoint, {
        Authorization: "Bearer " + user?.api_token,
      });
      let resJson = await res;
      console.log(resJson);
      setLoading(false);

      if (res.res === "error") {
        setErrorMessage(resJson.json.message);
        if (resJson.json.message === "Unauthenticated.") {
          history.push(`/login`);
          return;
        }
        setHandle(true);
        setType("error");
        setMsg(resJson.json.message);
      }
      if (res.res === "success") {
        console.log(res.json);

        let json = res.json;

        let csvArray = [];

        for (let [key, value] of Object.entries(json)) {
          csvArray.push(value);
        }
        console.log(csvArray);

        usefulServices.csv(csvArray, endPoint.substring(3), "xls");

        setErrorMessage("");
      }
    } catch (err) {
      console.log(err);
      setHandle(true);
      setType("error");
      setMsg("Something Broke, Please try again or contact Admin");
      console.log(err);
      setErrorMessage("Something Broke, Please try again or contact Admin");
    }
  };

  const bgImage = (num: string) => {
    return process.env.PUBLIC_URL + "/bgs/bg" + num + ".jpg";
  };

  return (
    <AppFrame
      headerText={
        user
          ? `Welcome Back, ${usefulServices.capitalizeFirstLetter(user?.name)}`
          : "Welcome Back, User"
      }
      headerTextPosition="flex-start"
      headerTextSize="h5"
      frameTitle="Reports"
      userGetter={setUser}
      loading={loading}
    >
      <div>
        {handle && (
          <Alert
            onClose={() => {
              window.location.reload();
            }}
            severity={type}
            className={classes.bottom}
          >
            {msg}
          </Alert>
        )}
        {loading && <LinearProgress />}
        <br />
        <Grid container justify="center">
          <Typography className={classes.secondHeading}>
            Select reports
          </Typography>
        </Grid>

        <Grid container spacing={3}>
          {reports.map((obj: any, index: any) => (
            <Grid item xs={4} key={index}>
              <Card className={classes.root}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={bgImage(obj.img)}
                    title={obj.subTitle}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {obj.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {obj.subTitle}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {obj.desc}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => handleReportClick(obj.val)}
                  >
                    Get Report
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </AppFrame>
  );
}

export default Report;
