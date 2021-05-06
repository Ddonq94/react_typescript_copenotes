import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import {
  createStyles,
  makeStyles,
  useTheme,
  Theme,
} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      fontSize: 20,
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
      <Card>
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            {co.header}
          </Typography>
        </CardContent>
        <CardActions>
          <Grid xs={co.middleText.length > 1 ? 6 : 12}>
            <Typography variant="h5" component="h2">
              {co.middleText[0]}
            </Typography>
          </Grid>

          {co.middleText.length > 1 && (
            <Grid xs={co.middleText.length > 1 ? 6 : 12}>
              <Typography variant="h5" component="h2">
                {co.middleText[1]}
              </Typography>
            </Grid>
          )}
        </CardActions>
        <CardActions>
          <Grid xs={co.middleText.length > 1 ? 6 : 12}>
            <Typography variant="h5" component="h2">
              <Button size="small">{co.footerText[0]}</Button>
            </Typography>
          </Grid>
          {co.middleText.length > 1 && (
            <Grid xs={co.middleText.length > 1 ? 6 : 12}>
              <Typography variant="h5" component="h2">
                <Button size="small"> {co.footerText[1]}</Button>
              </Typography>
            </Grid>
          )}
        </CardActions>
      </Card>
    </Grid>
  );
}

export default AppCard;
