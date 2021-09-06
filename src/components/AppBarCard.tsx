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
  data: any;
  size: GridSize;
  title: string;
  legendPos?: string;
  labels?: any[];
  datasets?: any[];
}

function AppBarCard({
  data,
  size = 1,
  title,
  legendPos = "top",
  labels = ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
}: Props) {
  const classes = useStyles();

  return (
    <Grid item xs={size}>
      <Card elevation={5}>
        <CardContent>
          <div>
            <Bar
              data={{
                labels,
                datasets: [
                  {
                    stack: "st1",
                    label: "In Service",
                    data: data.fesdInServ,
                    backgroundColor: "rgba(54, 162, 235, 0.8)",
                  },
                  {
                    stack: "st1",
                    label: "Damaged",
                    data: data.fesdDamaged,
                    backgroundColor: "rgba(255, 159, 64, 0.8)",
                  },
                  {
                    stack: "st1",
                    label: "Maintenance",
                    data: data.fesdMaint,
                    backgroundColor: "rgba(255, 206, 86, 0.8)",
                  },
                  {
                    stack: "st1",
                    label: "Replacement",
                    data: data.fesdRepl,
                    backgroundColor: "rgba(255, 99, 132, 0.8)",
                  },
                ],
              }}
              height={410}
              // width={600}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  title: {
                    display: true,
                    text: title,
                  },
                  legend: {
                    position: legendPos,
                  },
                },
                scales: {
                  yAxes: [
                    {
                      ticks: {
                        beginAtZero: true,
                      },
                    },
                  ],
                },
                legend: {
                  labels: {
                    fontSize: 25,
                  },
                },
              }}
            />
          </div>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default AppBarCard;
