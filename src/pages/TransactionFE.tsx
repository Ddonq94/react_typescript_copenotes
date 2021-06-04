import Fab from "@material-ui/core/Fab";
import Grid from "@material-ui/core/Grid";
import React, { useEffect, useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import AppFrame from "../components/AppFrame";
import Typography from "@material-ui/core/Typography";
import AppTable from "../components/AppTable";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import clsx from "clsx";

function TransactionFE({ parentRows }: any) {
  const [user, setUser] = useState<any>();

  const [parentClass, setParentClass] = useState<any>();
  const [columns, setColumns] = useState<any>();

  const [rows, setRows] = useState<any>();

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

  useEffect(() => {
    console.log(columns, rows, parentClass);
  }, [columns]);

  useEffect(() => {
    if (parentClass) {
      setColumns([
        { id: "timestamp", label: "Timestamp", minWidth: 85 },
        { id: "operator", label: "Operator", minWidth: 85 },
        { id: "equipmentName", label: "Equipment Name", minWidth: 85 },
        { id: "nextMaint", label: "Next Maintenance", minWidth: 85 },
        { id: "status", label: "Status", minWidth: 85 },
        {
          id: "actions",
          label: "Actions",
          minWidth: 85,
          format: (value: any) => {
            return (
              <div>
                <Button
                  variant="outlined"
                  className={clsx(
                    parentClass.textGreen,
                    parentClass.outlinedGreen
                  )}
                  size="small"
                >
                  View
                </Button>

                <Button
                  variant="outlined"
                  className={clsx(
                    parentClass.textCyan,
                    parentClass.outlinedCyan
                  )}
                  color="inherit"
                  size="small"
                >
                  Approve
                </Button>
                <Button
                  variant="outlined"
                  className={clsx(parentClass.textRed, parentClass.outlinedRed)}
                  size="small"
                >
                  Disapprove
                </Button>
              </div>
            );
          },
        },
      ]);
    }
  }, [parentClass]);

  useEffect(() => {
    if (parentRows) {
      console.log(parentRows);
      let prs: any[] = parentRows;
      let newRows = parentRows.map((pr: any) => {
        console.log(pr);
        return {
          timestamp: pr.created_at || "N/A",
          operator: pr?.user[0]?.name || "N/A",
          equipmentName: pr?.equipment[0]?.name || "N/A",
          nextMaint: pr?.next_maint || "N/A",
          status: pr.status,
          actions: pr.id,
        };
      });

      setRows(newRows);
    }
  }, [parentRows]);

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
          {rows ? `Total: ${rows.length}` : ""}
        </Typography>
      </Grid>

      <div style={styles.table}>
        <AppTable columns={columns} rows={rows} classSetter={setParentClass} />
      </div>

      <Grid container justify="flex-end" style={styles.top}>
        <Fab color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </Grid>
    </div>
  );
}

export default TransactionFE;
