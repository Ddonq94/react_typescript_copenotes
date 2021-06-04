import React, { useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import { Fab } from "@material-ui/core";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
  footer: {
    position: "fixed",
    bottom: 15,
    right: 10,
    textAlign: "center",
    // marginBottom: 10,
    // marginBottom: 10,
  },
});

type Anchor = "top" | "left" | "bottom" | "right";
type Size = "medium" | "large" | "small" | undefined;

interface Props {
  drawerText?: string;
  content: any;
  variant?: string;
  size?: Size;
  parentClass?: any;
  className?: any;
  type?: any;
  fabIcon?: any;
}

function AppDrawer({
  drawerText = "Open",
  content,
  size,
  parentClass,
  className,
  type,
  fabIcon,
}: Props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const makeStyle = (classes: any) => {
    let style = "";

    for (let cl of classes) {
      style += `${parentClass[cl]} `;
    }

    return style;
  };

  return (
    <>
      {(["right"] as Anchor[]).map((anchor) => (
        <React.Fragment key={anchor}>
          {type && type == "fab" ? (
            <Fab
              color="primary"
              aria-label="add"
              onClick={toggleDrawer(anchor, true)}
            >
              {fabIcon}
            </Fab>
          ) : (
            <Button
              className={makeStyle(className)}
              onClick={toggleDrawer(anchor, true)}
              size={size}
            >
              {drawerText}
            </Button>
          )}
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {content}

            <Button
              variant="contained"
              className={classes.footer}
              color="secondary"
              size="small"
              onClick={toggleDrawer(anchor, false)}
            >
              Close
            </Button>
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </>
  );
}

export default AppDrawer;
