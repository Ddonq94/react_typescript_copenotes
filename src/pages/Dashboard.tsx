import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import AppFilterBar from "../components/AppFilterBar";
import AppCards from "../components/AppCards";
import AppFrame from "../components/AppFrame";

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
  let cardsObj = [
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

  function createData(
    name: string,
    code: string,
    population: number,
    size: number
  ): any {
    const density = population / size;
    return { name, code, population, size, density };
  }

  let rows = [
    createData("India", "IN", 1324171354, 3287263),
    createData("China", "CN", 1403500365, 9596961),
    createData("Italy", "IT", 60483973, 301340),
    createData("United States", "US", 327167434, 9833520),
    createData("Canada", "CA", 37602103, 9984670),
    createData("Australia", "AU", 25475400, 7692024),
    createData("Germany", "DE", 83019200, 357578),
    createData("Ireland", "IE", 4857000, 70273),
    createData("Mexico", "MX", 126577691, 1972550),
    createData("Japan", "JP", 126317000, 377973),
    createData("France", "FR", 67022000, 640679),
    createData("United Kingdom", "GB", 67545757, 242495),
    createData("Russia", "RU", 146793744, 17098246),
    createData("Nigeria", "NG", 200962417, 923768),
    createData("Brazil", "BR", 210147125, 8515767),
  ];

  return (
    <AppFrame
      headerText="Welcome Back, Sean Uthman"
      headerTextPosition="flex-start"
      headerTextSize="h5"
      frameTitle="Dashboard"
    >
      <AppFilterBar />

      <AppCards obj={cardsObj} />
    </AppFrame>
  );
}

export default Dashboard;
