import Grid from "@material-ui/core/Grid";
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
  })
);

interface Props {
  co: any;
  ind: any;
}

function AppCard({ co, ind }: Props) {
  const classes = useStyles();

  return (
    <Grid key={`ind${ind}`} item xs={4}>
      <Card style={{ backgroundColor: co.bgColor }} elevation={5}>
        <CardContent>
          <Typography
            align="center"
            className={clsx(classes.title, classes.whiteText)}
            gutterBottom
          >
            {co.header}
          </Typography>
        </CardContent>
        <CardActions>
          <Grid xs={co.middleText.length > 1 ? 6 : 12}>
            <Typography
              align="center"
              className={classes.whiteText}
              variant="h5"
              component="h2"
            >
              {co.middleText[0]}
            </Typography>
          </Grid>

          {co.middleText.length > 1 && (
            <Grid xs={co.middleText.length > 1 ? 6 : 12}>
              <Typography
                align="center"
                className={classes.whiteText}
                variant="h5"
                component="h2"
              >
                {co.middleText[1]}
              </Typography>
            </Grid>
          )}
        </CardActions>
        <CardActions>
          <Grid xs={co.middleText.length > 1 ? 6 : 12}>
            <Typography align="center" variant="h5" component="h2">
              <Link
                to={co.footerLink[0]}
                className={clsx(classes.whiteText, classes.link)}
              >
                {co.footerText[0]}
              </Link>
            </Typography>
          </Grid>
          {co.middleText.length > 1 && (
            <Grid xs={co.middleText.length > 1 ? 6 : 12}>
              <Typography align="center" variant="h5" component="h2">
                <Link
                  to={co.footerLink[1]}
                  className={clsx(classes.whiteText, classes.link)}
                >
                  {co.footerText[1]}
                </Link>
              </Typography>
            </Grid>
          )}
        </CardActions>
      </Card>
    </Grid>
  );
}

export default AppCard;
