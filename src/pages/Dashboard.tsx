import React, { useContext, useEffect, useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import AppFilterBar from "../components/AppFilterBar";
import AppCards from "../components/AppCards";
import AppFrame from "../components/AppFrame";
import { UserContext } from "../context/UserContext";
import usefulServices from "../services/usefulServices";
import GlobalServices from "../services/GlobalServices";
import { useHistory } from "react-router-dom";
import { LinearProgress } from "@material-ui/core";

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
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  })
);

function Dashboard() {
  const [cardsObj, setCardsObj] = useState([]);

  const [errorMessage, setErrorMessage] = useState("");
  const [user, setUser] = useState<any>();
  const [loading, setLoading] = useState(false);

  let history = useHistory();

  const userContext = useContext(UserContext);

  useEffect(() => {
    const loadDash = async () => {
      if (user) {
        setLoading(true);

        try {
          const res = await GlobalServices.dashboard({
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
          }

          if (res.res === "success") {
            setCardsObj(resJson.json.data);

            setErrorMessage("");
          }
        } catch (err) {
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
        user
          ? `Welcome Back, ${usefulServices.capitalizeFirstLetter(user?.name)}`
          : "Welcome Back, User"
      }
      headerTextPosition="flex-start"
      headerTextSize="h5"
      frameTitle="Dashboard"
      userGetter={setUser}
      loading={loading}
    >
      {/* {loading && <LinearProgress />} */}
      {user && <AppFilterBar user={user} />}

      <AppCards obj={cardsObj} />
    </AppFrame>
  );
}

export default Dashboard;
