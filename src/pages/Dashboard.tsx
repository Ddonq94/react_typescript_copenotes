import React, { useContext, useEffect, useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import AppFilterBar from "../components/AppFilterBar";
import AppCards from "../components/AppCards";
import AppFrame from "../components/AppFrame";
import { UserContext } from "../context/UserContext";
import usefulServices from "../services/usefulServices";
import GlobalServices from "../services/GlobalServices";
import { useHistory } from "react-router-dom";
import { Grid, LinearProgress } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import AppDonutCard from "../components/AppDonutCard";
import AppBarCard from "../components/AppBarCard";
import AppTable from "../components/AppTable";
import AppDonutCardFooter from "../components/AppDonutCardFooter";

const drawerWidth = 220;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    fullWidth: {
      width: "100%",
    },
    clearFix: {
      marginTop: "50px",
    },
    clearFixSmall: {
      marginTop: "20px",
    },

    flexRight: {
      justifySelf: "flex-end",
    },
    sectionDesktop: {
      display: "none",
      [theme.breakpoints.up("md")]: {
        display: "flex",
      },
    },
    sectionMobile: {
      display: "flex",
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    margin: {
      margin: theme.spacing(1),
    },

    menuButton: {
      marginRight: 36,
    },
    hide: {
      display: "none",
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: "nowrap",
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: "hidden",
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9) + 1,
      },
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
    title: {
      flexGrow: 1,
    },
    siteTitle: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    toolbar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    top: {
      marginTop: "20px",
    },
    bottom: {
      marginBottom: "20px",
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  })
);

function Dashboard() {
  const classes = useStyles();

  const [cardsObj, setCardsObj] = useState([]);

  const [errorMessage, setErrorMessage] = useState("");
  const [user, setUser] = useState<any>();
  const [loading, setLoading] = useState(false);

  const [handle, setHandle] = useState(false);
  const [type, setType] = useState<any>();
  const [msg, setMsg] = useState("");
  const [expColumns, setExpColumns] = useState<any>([
    { id: "eqID", label: "Equipment ID", minWidth: 85 },
    { id: "name", label: "Location", minWidth: 85 },
    { id: "expiry", label: "Estimated Expiry", minWidth: 85 },
  ]);

  const [maintColumns, setMaintColumns] = useState<any>([
    { id: "eqID", label: "Equipment ID", minWidth: 85 },
    { id: "name", label: "Location", minWidth: 85 },
    { id: "dueDate", label: "Due Date", minWidth: 85 },
  ]);
  const [expRows, setExpRows] = useState<any>([]);
  const [maintRows, setMaintRows] = useState<any>([]);

  const [afeLabels, setAfeLabels] = useState<any>([]);
  const [afeData, setAfeData] = useState<any>([]);

  const [fesdLabels, setFesdLabels] = useState<any>([]);
  const [fesdData, setFesdData] = useState<any>([]);

  const [pcaLabels, setPcaLabels] = useState<any>([]);
  const [pcaData, setPcaData] = useState<any>([]);

  const [fedLabels, setFedLabels] = useState<any>([]);
  const [fedData, setFedData] = useState<any>([]);

  let history = useHistory();

  const userContext = useContext(UserContext);

  useEffect(() => {
    const loadDash = async () => {
      console.log("fish");

      if (user) {
        setLoading(true);

        try {
          const res = await GlobalServices.dashboard2({
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
            // setCardsObj(resJson.json.data);
            console.log(resJson.json.data);

            let data = resJson.json.data;

            setExpRows(Object.values(data.expNotice));
            setMaintRows(Object.values(data.maintNotice));

            setAfeLabels(data.afeLabels);
            setAfeData(data.afeData);

            setFesdLabels(data.fesdLabels);
            setFesdData(data.fesdData);

            setPcaLabels(data.pcaLabels);
            setPcaData(data.pcaData);

            setFedLabels(data.fedLabels);
            setFedData(data.fedData);

            setErrorMessage("");
          }
        } catch (err) {
          console.log(err);
          setHandle(true);
          setType("error");
          setMsg(err || "Something Broke, Please try again or contact Admin");
          console.log(err);
          setErrorMessage("Something Broke, Please try again or contact Admin");
        }
      }
    };

    loadDash();
  }, [user]);

  return (
    <AppFrame
      headerText={
        user ? (
          <>
            Welcome Back,{" "}
            <strong>{usefulServices.capitalizeFirstLetter(user?.name)}</strong>
          </>
        ) : (
          "Welcome Back, User"
        )
      }
      headerTextPosition="flex-start"
      headerTextSize="h5"
      frameTitle="Dashboard"
      userGetter={setUser}
      loading={loading}
    >
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
      {/* {loading && <LinearProgress />} */}
      {/* {user && <AppFilterBar user={user} />} */}

      <Grid container spacing={3} style={{ marginTop: "20px" }}>
        <AppDonutCard
          data={afeData}
          size={4}
          title="Active Fire Extinguishers"
          labels={afeLabels}
        />
        {/* cardAction={<AppDonutCardFooter data={afeData} />} */}

        <AppBarCard
          data={fesdData}
          size={8}
          title="Fire Extinguisher Status Distribution"
          labels={fesdLabels}
        />

        {/* {expRows.length > 0 && ( */}
        {true && (
          <Grid item xs={6}>
            <AppTable
              columns={expColumns}
              rows={expRows}
              paginate={false}
              title="Expiration Notice"
            />
          </Grid>
        )}

        {/* {maintRows.length > 0 && ( */}
        {true && (
          <Grid item xs={6}>
            <AppTable
              columns={maintColumns}
              rows={maintRows}
              paginate={false}
              title="Annual Maintenance Notice"
            />
          </Grid>
        )}

        <AppDonutCard
          data={pcaData}
          size={6}
          title="Physical Condition Analysis"
          legendPos="right"
          labels={pcaLabels}
        />
        <AppDonutCard
          data={fedData}
          size={6}
          title="Fire Extinguisher Distribution"
          legendPos="right"
          labels={fedLabels}
        />
      </Grid>

      {/* <AppCards obj={cardsObj} /> */}
    </AppFrame>
  );
}

export default Dashboard;
