import { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";

import {
  createStyles,
  makeStyles,
  useTheme,
  Theme,
} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    fullWidth: {
      width: "100%",
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: "100%",
    },
    clearFixSmall: {
      marginTop: "20px",
    },
    margin: {
      margin: theme.spacing(1),
    },
    container: {
      maxHeight: 840,
    },
  })
);

function AppFilterBar() {
  const classes = useStyles();
  const theme = useTheme();

  const [userType, setUserType] = useState();
  const [equipment, setEquipment] = useState();
  const [subNode, setSubNode] = useState();

  return (
    <div>
      <Grid
        container
        spacing={3}
        direction="row"
        justify="center"
        alignItems="flex-end"
      >
        <Grid item xs={2}>
          <Typography variant="h6" color="primary" noWrap>
            <i>Filter By:</i>
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">User Types</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={userType}
              // onChange={handleChange}
            >
              <MenuItem value={10}>Area Admin</MenuItem>
              <MenuItem value={11}>Location Admin</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Equipment</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={equipment}
            >
              <MenuItem value={10}>Fire Truck</MenuItem>
              <MenuItem value={11}>Fire Extinguisher</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Sub Node</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={subNode}
            >
              <MenuItem value={11}>Area</MenuItem>
              <MenuItem value={10}>Location</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={1}>
          <Button
            variant="contained"
            size="small"
            color="primary"
            className={classes.margin}
          >
            Go
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default AppFilterBar;
