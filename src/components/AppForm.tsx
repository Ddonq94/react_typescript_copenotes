import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {
  createStyles,
  makeStyles,
  useTheme,
  Theme,
} from "@material-ui/core/styles";

interface Props {
  fields?: any;
  submitString?: any;
}

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  fullWidth: {
    width: "100%",
  },
  clearFixSmall: {
    marginTop: "20px",
  },
  container: {
    maxHeight: 840,
  },
});

function AppForm({ fields, submitString }: Props) {
  const classes = useStyles();

  return (
    <div>
      <form autoComplete="off">
        <Grid container spacing={10}>
          {fields.map((field: any, index: number) => {
            return (
              <Grid key={`field${index}`} item xs={6}>
                <TextField
                  className={classes.fullWidth}
                  required={field.required}
                  id={`id${index}`}
                  label={field.label}
                  defaultValue={field.defaultValue}
                  name={field.name}
                  type={field.type}
                  variant="standard"
                  disabled={field.disabled}
                />
              </Grid>
            );
          })}
        </Grid>
        <Grid container justify="flex-end">
          <Button
            className={classes.clearFixSmall}
            variant="contained"
            color="primary"
          >
            {submitString}
          </Button>
        </Grid>
      </form>
    </div>
  );
}

export default AppForm;
