import Grid, { GridSize } from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import { Link } from "react-router-dom";

import {
  createStyles,
  makeStyles,
  useTheme,
  Theme,
  withStyles,
} from "@material-ui/core/styles";

import { Bar } from "react-chartjs-2";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      fontSize: 20,
    },
    link: {
      fontSize: 15,
    },
    whiteText: {
      color: "#FFFFFF",
    },
    left: {
      borderLeft: "1px solid white",
    },
  })
);

interface Props {
  data?: any[];
  size?: GridSize;
  labels?: any[];
  backgroundColor?: any[];
}

function AppDonutCardFooter({
  data = [0, 0],
  size = 6,
  labels = ["Inspected", "Not Inspected"],
  backgroundColor = [
    "rgba(255, 99, 132, 0.8)",
    "rgba(54, 162, 235, 0.8)",
    "rgba(255, 206, 86, 0.8)",
    "rgba(75, 192, 192, 0.8)",
    "rgba(153, 102, 255, 0.8)",
    "rgba(255, 159, 64, 0.8)",
    "rgba(55, 15, 64, 0.8)",
  ],
}: Props) {
  const classes = useStyles();

  return (
    <Grid container spacing={3} style={{ marginTop: "20px" }}>
      {data.map((co: any, ind: number) => {
        return (
          <Grid item xs={size}>
            {co}
          </Grid>
        );
      })}
    </Grid>
  );
}

export default AppDonutCardFooter;
