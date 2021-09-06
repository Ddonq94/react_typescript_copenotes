import { Avatar, Box, Grid, Typography } from "@material-ui/core";
import React from "react";
import clsx from "clsx";
import {
  createStyles,
  makeStyles,
  useTheme,
  Theme,
} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    inMargin: {
      margin: theme.spacing(2),
    },

    large: {
      width: theme.spacing(35),
      height: theme.spacing(25),
    },
    top: {
      marginTop: "90px",
      marginBottom: "10px",
    },
  })
);

function AppEmpty() {
  const classes = useStyles();

  return (
    <Box component="span" display="block" className={classes.top}>
      <Grid container justify="center">
        <Grid container justify="center" item xs={12}>
          <img
            alt="Remy Sharp"
            src={process.env.PUBLIC_URL + "/empty.png"}
            className={clsx(classes.large, classes.inMargin)}
          />
        </Grid>
        <Grid>
          <div>
            <Typography
              component="h5"
              variant="h5"
              align="center"
              color="primary"
            >
              Nothing to see here!
            </Typography>
          </div>
        </Grid>
      </Grid>
    </Box>
  );
}

export default AppEmpty;
