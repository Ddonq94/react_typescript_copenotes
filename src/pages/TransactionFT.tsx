import Fab from "@material-ui/core/Fab";
import Grid from "@material-ui/core/Grid";
import React, { useEffect, useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import AppFrame from "../components/AppFrame";
import Typography from "@material-ui/core/Typography";
import AppTable from "../components/AppTable";
import { Link, useHistory } from "react-router-dom";
import { Box, Button, Divider, LinearProgress, Paper } from "@material-ui/core";
import clsx from "clsx";
import GlobalServices from "../services/GlobalServices";
import AppDrawer from "../components/AppDrawer";
import usefulServices from "../services/usefulServices";
import AppEmpty from "../components/AppEmpty";

function TransactionFT({ parentRows, user }: any) {
  const [parentClass, setParentClass] = useState<any>();
  const [columns, setColumns] = useState<any>();

  const [nodesObj, setNodesObj] = useState<any>();

  const [rows, setRows] = useState<any>();

  const [errorMessage, setErrorMessage] = useState("");

  const [loading, setLoading] = useState(false);

  let history = useHistory();

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
    if (parentClass && rows) {
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
                <AppDrawer
                  variant="outlined"
                  parentClass={parentClass}
                  className={["textGreen", "outlinedGreen"]}
                  size="small"
                  content={viewContent(value)}
                  drawerText="View"
                />

                <Button
                  variant="outlined"
                  className={clsx(
                    parentClass.textCyan,
                    parentClass.outlinedCyan
                  )}
                  color="inherit"
                  size="small"
                  onClick={() => toggler(value, true)}
                >
                  Approve
                </Button>

                <Button
                  variant="outlined"
                  className={clsx(parentClass.textRed, parentClass.outlinedRed)}
                  color="inherit"
                  size="small"
                  onClick={() => toggler(value, false)}
                >
                  Disapprove
                </Button>
              </div>
            );
          },
        },
      ]);
    }
  }, [parentClass, rows]);

  useEffect(() => {
    if (parentRows) {
      console.log(parentRows);
      setNodesObj(parentRows);

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

  const viewContent = (id: any) => {
    console.log(rows, id, nodesObj);

    if (rows && nodesObj) {
      let current = rows.filter((row: any) => {
        return row.actions === id;
      });

      console.log(current, nodesObj);

      let content = Object.keys(current[0]).map((a: any, ind) => {
        const buttons = (
          <>
            <Button
              variant="outlined"
              className={clsx(parentClass.textCyan, parentClass.outlinedCyan)}
              color="inherit"
              size="small"
              onClick={() => toggler(id, true)}
            >
              Approve
            </Button>

            <Button
              variant="outlined"
              className={clsx(parentClass.textRed, parentClass.outlinedRed)}
              color="inherit"
              size="small"
              onClick={() => toggler(id, false)}
            >
              Disapprove
            </Button>
          </>
        );

        return a === "actions" ? (
          <Paper
            elevation={10}
            style={{
              margin: "10px",
              padding: "10px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {buttons}
          </Paper>
        ) : (
          <Paper elevation={10} style={{ margin: "10px", padding: "10px" }}>
            <b>{`${usefulServices.capitalizeFirstLetter(a)}`}</b>
            {a === "status"
              ? `: ${current[0][a] == 1 ? "Active" : "Inactive"}`
              : `: ${current[0][a]}`}
          </Paper>
        );
      });

      return (
        <Box style={{ margin: "10px" }} width={450}>
          <Typography color="primary" variant="h6">
            View Transaction details
          </Typography>
          <Divider />
          <br />

          {content}
        </Box>
      );
    }
    return "Not Available";
  };

  const toggler = async (id: any, stat: boolean) => {
    console.log(id);

    let status = stat ? 1 : 2;
    console.log(status);
    setLoading(true);

    try {
      const res = await GlobalServices.generic(
        { status },
        "PUT",
        "Transactions/" + id,
        {
          Authorization: "Bearer " + user?.api_token,
        }
      );
      let resJson = await res;
      console.log(resJson);
      setLoading(false);

      if (res.res === "error") {
        setErrorMessage(resJson.json.message);
        if (resJson.json.message === "Unauthenticated.") {
          history.push(`/login`);
          return;
        }
      }
      if (res.res === "success") {
        setErrorMessage("");
      }
    } catch (err) {
      console.log(err);
      setErrorMessage("Something Broke, Please try again or contact Admin");
    }

    window.location.reload();
  };

  return (
    <div>
      {loading && <LinearProgress />}
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Typography color="primary" variant="subtitle1">
          Manage Fire Extinguishers
        </Typography>

        <Typography color="primary" variant="subtitle1">
          {rows ? `Total: ${rows.length}` : ""}
        </Typography>
      </Grid>

      <div style={styles.table}>
        {rows && rows.length ? (
          <AppTable
            columns={columns}
            rows={rows}
            classSetter={setParentClass}
          />
        ) : (
          <AppEmpty />
        )}
      </div>

      {/* <Grid container justify="flex-end" style={styles.top}>
        <Fab color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </Grid> */}
    </div>
  );
}

export default TransactionFT;
