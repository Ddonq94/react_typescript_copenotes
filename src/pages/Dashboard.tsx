import React, { useContext, useEffect, useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import AppFilterBar from "../components/AppFilterBar";
import AppCards from "../components/AppCards";
import AppFrame from "../components/AppFrame";
import { UserContext } from "../context/UserContext";
import usefulServices from "../services/usefulServices";
import GlobalServices from "../services/GlobalServices";
import { useHistory } from "react-router-dom";

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
  const [logoUrl, setLogoUrl] = useState("https://source.unsplash.com/random");
  const [user, setUser] = useState<any>();

  let cardsObjold = [
    {
      header: "Number of Fire Extinguishers",
      type: 1,
      middleText: ["400"],
      footerText: ["Manage"],
      footerLink: ["/equipment"],
      bgColor: "#72E9B5",
    },
    {
      header: "Number of Fire Trucks",
      type: 1,
      middleText: ["100"],
      footerText: ["Manage"],
      footerLink: ["/equipment"],
      bgColor: "#BEDE53",
    },
    {
      header: "Equipment Due For Service",
      type: 2,
      middleText: ["20", "30"],
      footerText: ["Fire Ext.", "Trucks"],
      footerLink: ["/equipment", "/equipment"],
      bgColor: "#F71C40",
    },
    {
      header: "Number of Users",
      type: 1,
      middleText: ["400"],
      footerText: ["Manage"],
      footerLink: ["/user"],
      bgColor: "#E97272",
    },
    {
      header: "Number of Equipments",
      type: 1,
      middleText: ["100"],
      footerText: ["Manage"],
      footerLink: ["/equipment"],
      bgColor: "#EFC75A",
    },
    {
      header: "Number of Sub-Nodes",
      type: 2,
      middleText: ["20", "30"],
      footerText: ["Areas", "Locations"],
      footerLink: ["/area", "/location"],
      bgColor: "#469EE1",
    },
  ];

  const userContext = useContext(UserContext);

  let history = useHistory();

  useEffect(() => {
    const loadDash = async () => {
      if (user) {
        try {
          const res = await GlobalServices.dashboard({
            Authorization: "Bearer " + user?.api_token,
          });

          let resJson = await res;
          console.log(resJson);

          if (res.res === "error") {
            setErrorMessage(resJson.json.message);
            if (resJson.json.message === "Unauthenticated.") {
              history.push(`/login`);
            }
          }

          if (res.res === "success") {
            setCardsObj(resJson.json.data);

            setErrorMessage("");
            // history.push(`/dashboard`);
          }
        } catch (err) {
          console.log(err);
          setErrorMessage("Something Broke, Please try again or contact Admin");
        }
      }
    };

    loadDash();
  }, [user]);

  useEffect(() => {
    let sessionUser = sessionStorage.getItem("user");
    console.log(sessionUser);
    if (
      sessionUser === null ||
      typeof JSON.parse(sessionUser || "") !== "object"
    ) {
      history.push(`/login`);
    }

    let user = JSON.parse(sessionUser || "")?.data;
    console.log(user);

    setUser(user);
    setLogoUrl(user.path + "/" + user.company.logo_url);
  }, []);

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
      logoUrl={logoUrl}
    >
      <AppFilterBar />

      <AppCards obj={cardsObj} />
    </AppFrame>
  );
}

export default Dashboard;
