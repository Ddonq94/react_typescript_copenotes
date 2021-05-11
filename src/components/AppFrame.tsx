import React, { useState } from "react";
import clsx from "clsx";
import {
  createStyles,
  makeStyles,
  useTheme,
  Theme,
} from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import RoomIcon from "@material-ui/icons/Room";
import DashboardIcon from "@material-ui/icons/Dashboard";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import MapIcon from "@material-ui/icons/Map";
import SettingsIcon from "@material-ui/icons/Settings";
import ReceiptIcon from "@material-ui/icons/Receipt";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import GroupIcon from "@material-ui/icons/Group";
import BusinessIcon from "@material-ui/icons/Business";
import { Link, useLocation } from "react-router-dom";
import Grid, { GridJustification } from "@material-ui/core/Grid";

import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import AppTable from "./AppTable";
import AppForm from "./AppForm";
import AppFilterBar from "./AppFilterBar";
import AppCards from "./AppCards";
import { Variant } from "@material-ui/core/styles/createTypography";
import Avatar from "@material-ui/core/Avatar";

interface Props {
  children: any;
  headerText?: string;
  headerTextPosition?: GridJustification;
  headerTextSize?: Variant;
  frameTitle?: string;
}

const drawerWidth = 210;

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
    bg: {
      backgroundColor: "#3F51B5",
      color: "#ffffff",
    },
    top: {
      marginTop: "60px",
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
      backgroundColor: "#ffffff",
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
    whiteText: {
      color: "#FFFFFF",
    },
    blueText: {
      color: "#3F51B5",
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
      backgroundColor: "#ffffff",
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    large: {
      width: theme.spacing(4),
      height: theme.spacing(4),
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  })
);

function AppFrame({
  children,
  headerText,
  headerTextPosition = "center",
  headerTextSize,
  frameTitle = "Title",
}: Props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  let menuObj = [
    {
      name: "Dashboard",
      icon: <DashboardIcon />,
      linkTo: "/dashboard",
    },
    {
      name: "Profile Mgt.",
      icon: <AccountCircleIcon />,
      linkTo: "/profile",
    },
    {
      name: "Company Mgt.",
      icon: <BusinessIcon />,
      linkTo: "/company",
    },
    {
      name: "Area Mgt.",
      icon: <MapIcon />,
      linkTo: "/area",
    },
    {
      name: "Location Mgt.",
      icon: <RoomIcon />,
      linkTo: "/location",
    },
    {
      name: "Equipment Mgt.",
      icon: <SettingsIcon />,
      linkTo: "/equipment",
    },
    {
      name: "Transaction Mgt.",
      icon: <ReceiptIcon />,
      linkTo: "/transaction",
    },
    {
      name: "User Mgt.",
      icon: <GroupIcon />,
      linkTo: "/user",
    },
    {
      name: "Logout",
      icon: <ExitToAppIcon />,
      linkTo: "/login",
    },
  ];

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

  const path = useLocation().pathname;
  console.log(path);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon className={classes.blueText} />
          </IconButton>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Typography variant="h6" color="primary" noWrap>
              {frameTitle}
            </Typography>
            <Avatar
              alt="Remy Sharp"
              src="https://source.unsplash.com/random"
              className={classes.large}
            />
          </Grid>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.bg, classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx(classes.bg, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <div className={classes.siteTitle}>
            <AccountCircleIcon className={classes.blueText} />
            <Typography variant="h6" color="primary" noWrap>
              FSMS
            </Typography>
          </div>
          <IconButton className={classes.blueText} onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {menuObj.map((obj, index) => (
            <Link to={obj.linkTo} key={`${obj.name}${index}`}>
              <ListItem selected={path === obj.linkTo} button>
                <ListItemIcon className={classes.whiteText}>
                  {obj.icon}
                </ListItemIcon>
                <ListItemText
                  className={classes.whiteText}
                  primary={obj.name}
                />
              </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.top} />
        <Grid container justify={headerTextPosition}>
          <Typography variant={headerTextSize} color="primary" noWrap>
            {headerText}
          </Typography>
        </Grid>

        {children}
      </main>
    </div>
  );
}

export default AppFrame;
