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
  submitButtonMethod?: any;
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
  submitButtonMethod,
}: Props) {
  const classes = useStyles();

  return (
    <div>
      <form autoComplete="off" onSubmit={(ev) => ev.preventDefault()}>
        <Grid container spacing={10}>
          {fields?.map((field: any, index: number) => {
            const changeSetter = (ev: any, field: any) => {
              if (field.type === "file") {
                createImage(ev.target.files[0]);
                console.log(ev.target.files[0], "evfile");
              } else {
                field.setter(ev.target.value);
                console.log(ev.target.value, "ev");
              }
            };

            const createImage = (file: any) => {
              let reader = new FileReader();
              reader.onload = (e: any) => {
                field.setter(e.target.result);
                console.log(e.target.result);
              };
              reader.readAsDataURL(file);
            };

            return (
              <Grid key={`field${index}`} item xs={6}>
                <TextField
                  className={classes.fullWidth}
                  required={field.required}
                  id={`id${index}`}
                  label={field.label}
                  defaultValue={field.defaultValue}
                  onChange={(ev: any) => changeSetter(ev, field)}
                  // value={field.value}
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
            onClick={submitButtonMethod}
          >
            {submitString}
          </Button>
        </Grid>
      </form>
    </div>
  );
}

export default AppForm;
