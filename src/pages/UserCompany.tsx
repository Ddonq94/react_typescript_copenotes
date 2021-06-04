import Fab from "@material-ui/core/Fab";
import Grid from "@material-ui/core/Grid";
import React, { useEffect, useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import AppFrame from "../components/AppFrame";
import Typography from "@material-ui/core/Typography";
import AppTable from "../components/AppTable";
import { Button } from "@material-ui/core";
import clsx from "clsx";

function UserCompany({ parentRows }: any) {
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
        { id: "userName", label: "Username", minWidth: 85 },
        { id: "fullName", label: "Full Name", minWidth: 85 },
        { id: "companyName", label: "Company Name", minWidth: 85 },
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
                    parentClass.textOrange,
                    parentClass.outlinedOrange
                  )}
                  color="secondary"
                  size="small"
                >
                  Edit
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
                  Toggle
                </Button>
                <Button
                  variant="outlined"
                  className={clsx(parentClass.textRed, parentClass.outlinedRed)}
                  size="small"
                >
                  Disable
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
      // return;
      let prs: any[] = parentRows;
      let newRows = parentRows.map((pr: any) => {
        console.log(pr);
        return {
          userName: pr?.email || "N/A",
          fullName: pr?.name || "N/A",
          companyName: pr?.company.name || "N/A",
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
      >
        <Typography color="primary" variant="subtitle1">
          Manage Company Users
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

export default UserCompany;
