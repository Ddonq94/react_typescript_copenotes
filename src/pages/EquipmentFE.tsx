import Fab from "@material-ui/core/Fab";
import Grid from "@material-ui/core/Grid";
import React from "react";
import AddIcon from "@material-ui/icons/Add";
import AppFrame from "../components/AppFrame";
import Typography from "@material-ui/core/Typography";
import AppTable from "../components/AppTable";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

function EquipmentFE() {
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
    { id: "location", label: "Location", minWidth: 85 },
    { id: "locationPlacement", label: "Location Placement", minWidth: 85 },
    { id: "lastMaint", label: "Last Maintenance", minWidth: 85 },
    { id: "nextMaint", label: "Next Maintenance", minWidth: 85 },
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
      location: "Lekki",
      locationPlacement: "Second floor corridor",
      lastMaint: "2021-10-10 10:15:22",
      nextMaint: "2021-12-10 10:15:22",
      status: "Active",
      actions: 1,
    },
  ];

  return (
    <div>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
        // style={styles.top}
      >
        <Typography color="primary" variant="subtitle1">
          Manage Fire Extinguishers
        </Typography>

        <Typography color="primary" variant="subtitle1">
          Total: 44
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
    </div>
  );
}

export default EquipmentFE;
