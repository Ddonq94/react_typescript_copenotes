import Fab from "@material-ui/core/Fab";
import Grid from "@material-ui/core/Grid";
import React from "react";
import AddIcon from "@material-ui/icons/Add";
import AppFrame from "../components/AppFrame";
import Typography from "@material-ui/core/Typography";
import AppTable from "../components/AppTable";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

function Area() {
  const styles = {
    top: {
      marginTop: "20px",
    },
    bottom: {
      marginBottom: "20px",
    },
    table: {
      marginTop: "20px",
      marginBottom: "40px",
    },
  };

  let columns: any = [
    { id: "name", label: "Name (Nickname)", minWidth: 85 },
    { id: "users", label: "No. of Users", minWidth: 85 },
    { id: "equipments", label: "No. of Equipments", minWidth: 85 },
    {
      id: "locations",
      label: "No. of Locations",
      minWidth: 85,
    },
    { id: "status", label: "Status", minWidth: 85 },
    {
      id: "actions",
      label: "Actions",
      minWidth: 85,
      format: (value: any) => {
        return (
          <div>
            <Button variant="outlined" color="primary" size="small">
              fish
            </Button>
            <Button variant="outlined" color="secondary" size="small">
              fish
            </Button>
            <Button variant="outlined" size="small">
              fish
            </Button>
          </div>
        );
      },
    },
  ];

  let rows: any = [
    {
      name: "Area 1",
      users: 1,
      equipments: 1,
      locations: 1.223,
      status: "Active",
      actions: 1,
    },
    {
      name: "Area 1",
      users: 1,
      equipments: 1,
      locations: 1.223,
      status: "Active",
      actions: 1,
    },
    {
      name: "Area 1",
      users: 1,
      equipments: 1,
      locations: 1.223,
      status: "Active",
      actions: 1,
    },
    {
      name: "Area 1",
      users: 1,
      equipments: 1,
      locations: 1.223,
      status: "Active",
      actions: 1,
    },
    {
      name: "Area 1",
      users: 1,
      equipments: 1,
      locations: 1.223,
      status: "Active",
      actions: 1,
    },
    {
      name: "Area 1",
      users: 1,
      equipments: 1,
      locations: 1.223,
      status: "Active",
      actions: 1,
    },
  ];

  return (
    <AppFrame
      headerText="Welcome Back, Sean Uthman"
      headerTextPosition="flex-start"
      headerTextSize="h5"
      frameTitle="Area Management"
    >
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
        style={styles.top}
      >
        <Typography color="primary" variant="subtitle1">
          Manage All
        </Typography>

        <Typography color="primary" variant="subtitle1">
          Total: 45
        </Typography>
      </Grid>

      <div style={styles.table}>
        <AppTable columns={columns} rows={rows} />
      </div>

      <Grid container justify="flex-end" style={styles.top}>
        <Fab color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </Grid>
    </AppFrame>
  );
}

export default Area;
