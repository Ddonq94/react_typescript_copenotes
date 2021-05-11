import Grid, { GridJustification } from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {
  createStyles,
  makeStyles,
  useTheme,
  Theme,
} from "@material-ui/core/styles";

interface Props {
  fields?: any[];
  submitString?: string;
  submitButtonPosition?: GridJustification;
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
  clearFix: {
    marginTop: "40px",
  },
  container: {
    maxHeight: 840,
  },
});

function AppForm({
  fields,
  submitString,
  submitButtonPosition = "flex-end",
}: Props) {
  const classes = useStyles();

  return (
    <div>
      <form autoComplete="off">
        <Grid container spacing={10}>
          {fields?.map((field: any, index: number) => {
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
        <Grid container justify={submitButtonPosition}>
          <Button
            className={classes.clearFix}
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
