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

import { Doughnut } from "react-chartjs-2";

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
  cardAction?: any;
}

function AppDonutCard({
  data = [12, 19, 3, 5, 2, 3],
  size,
  title,
  legendPos = "top",
  labels = ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  cardAction,
}: Props) {
  const classes = useStyles();

  return (
    <Grid item xs={size}>
      <Card elevation={5}>
        <CardContent>
          <div>
            <Doughnut
              data={{
                labels: labels,
                datasets: [
                  {
                    label: "# of votes",
                    data,
                    backgroundColor: [
                      "rgba(255, 99, 132, 0.8)",
                      "rgba(54, 162, 235, 0.8)",
                      "rgba(255, 206, 86, 0.8)",
                      "rgba(75, 192, 192, 0.8)",
                      "rgba(153, 102, 255, 0.8)",
                      "rgba(255, 159, 64, 0.8)",
                      "rgba(55, 15, 64, 0.8)",
                    ],
                    // borderColor: [
                    //   "rgba(255, 99, 132, 1)",
                    //   "rgba(54, 162, 235, 1)",
                    //   "rgba(255, 206, 86, 1)",
                    //   "rgba(75, 192, 192, 1)",
                    //   "rgba(153, 102, 255, 1)",
                    //   "rgba(255, 159, 64, 1)",
                    // ],
                    // borderWidth: 1,
                  },
                ],
              }}
              height={400}
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
                legend: {
                  labels: {
                    fontSize: 12,
                  },
                },
              }}
            />
          </div>
        </CardContent>
        {cardAction && <CardActions>{cardAction}</CardActions>}
      </Card>
    </Grid>
  );
}

export default AppDonutCard;
