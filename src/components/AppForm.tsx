import Grid, { GridJustification, GridSize } from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {
  createStyles,
  makeStyles,
  useTheme,
  Theme,
} from "@material-ui/core/styles";
import React, { useState } from "react";
import {
  Checkbox,
  Chip,
  Input,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
} from "@material-ui/core";

type spanSize = boolean | GridSize | undefined;

interface Props {
  fields?: any[];
  submitString?: string;
  submitButtonPosition?: GridJustification;
  submitButtonMethod?: any;
  buttonDisabled?: boolean;
  span?: spanSize;
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
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
});

function AppForm({
  fields,
  submitString,
  submitButtonPosition = "flex-end",
  submitButtonMethod,
  buttonDisabled,
  span = 6,
}: Props) {
  const classes = useStyles();
  // const [personName, setPersonName] = useState<string[]>([]);
  const theme = useTheme();

  return (
    <div>
      <form autoComplete="off" onSubmit={(ev) => ev.preventDefault()}>
        <Grid container spacing={10}>
          {fields?.map((field: any, index: number) => {
            // if (field.type === "selectMultiple") {
            //   field.setter(JSON.parse(field.value));
            // } else {
            // field.setter(field.defaultValue);
            // }

            function getStyles(
              name: string,
              personName: string[],
              theme: Theme
            ) {
              return {
                fontWeight:
                  personName.indexOf(name) === -1
                    ? theme.typography.fontWeightRegular
                    : theme.typography.fontWeightMedium,
              };
            }
            const changeSetter = (ev: any, field: any) => {
              if (field.type === "file") {
                createImage(ev.target.files[0]);
              } else {
                field.setter(ev.target.value);
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

            const handleChange = (
              event: React.ChangeEvent<{ value: unknown }>
            ) => {
              console.log(event.target.value);

              // setPersonName(event.target.value as string[]);
              field.setter(event.target.value as string[]);
            };

            const handleSelectChange = (
              event: React.ChangeEvent<{ value: unknown }>
            ) => {
              field.setter(event.target.value as string);
            };

            const ITEM_HEIGHT = 48;
            const ITEM_PADDING_TOP = 8;
            const MenuProps = {
              PaperProps: {
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                  width: 250,
                },
              },
            };

            if (field.type === "select") {
              return (
                <Grid key={`field${index}`} item xs={field.span || span}>
                  <InputLabel id={`fieldCheckLabel${index}`}>
                    {field.label}
                  </InputLabel>
                  <Select
                    style={{ width: "100%" }}
                    labelId={`fieldCheckLabel${index}`}
                    id={`fieldCheck${index}`}
                    value={field.value}
                    onChange={handleSelectChange}
                    defaultValue={field.defaultValue}
                  >
                    {field.options.map((opt: any) => (
                      <MenuItem key={opt.id} value={opt.id}>
                        {opt.name}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
              );
            }
            if (field.type === "selectMultiple") {
              return (
                <Grid key={`field${index}`} item xs={field.span || span}>
                  {field.defaultValue && field.new ? (
                    <>
                      <InputLabel id={`fieldCheckLabel${index}`}>
                        {field.label}
                      </InputLabel>
                      <Select
                        style={{ width: "100%" }}
                        labelId={`fieldCheckLabel${index}`}
                        id={`fieldCheck${index}`}
                        multiple
                        value={field.value}
                        // defaultValue={field.defaultValue}
                        onChange={handleChange}
                        input={<Input />}
                        MenuProps={MenuProps}
                      >
                        {field.options.map((opt: any) => (
                          <MenuItem
                            key={opt.id}
                            value={opt.id}
                            style={getStyles(opt.name, field.value, theme)}
                          >
                            {opt.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </>
                  ) : (
                    <>
                      <InputLabel id={`fieldCheckLabel${index}`}>
                        {field.label}
                      </InputLabel>

                      <Select
                        style={{ width: "100%" }}
                        labelId={`fieldCheckLabel${index}`}
                        id={`fieldCheck${index}`}
                        multiple
                        // value={field.value}
                        defaultValue={field.defaultValue}
                        onChange={handleChange}
                        input={<Input />}
                        MenuProps={MenuProps}
                      >
                        {field.options.map((opt: any) => (
                          <MenuItem
                            key={opt.id}
                            value={opt.id}
                            style={getStyles(opt.name, field.value, theme)}
                          >
                            {opt.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </>
                  )}
                </Grid>
              );
            }

            return (
              <Grid key={`field${index}`} item xs={field.span || span}>
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
            disabled={buttonDisabled}
          >
            {submitString}
          </Button>
        </Grid>
      </form>
    </div>
  );
}

export default AppForm;
