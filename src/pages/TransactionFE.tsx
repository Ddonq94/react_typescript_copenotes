import Fab from "@material-ui/core/Fab";
import Grid from "@material-ui/core/Grid";
import React, { useEffect, useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import AppFrame from "../components/AppFrame";
import Typography from "@material-ui/core/Typography";
import AppTable from "../components/AppTable";
import { Link, useHistory } from "react-router-dom";
import {
  Box,
  Button,
  Divider,
  LinearProgress,
  Paper,
  TextField,
} from "@material-ui/core";
import clsx from "clsx";
import AppDrawer from "../components/AppDrawer";
import usefulServices from "../services/usefulServices";
import GlobalServices from "../services/GlobalServices";
import AppEmpty from "../components/AppEmpty";
import { Refresh } from "@material-ui/icons";
import Snacky from "../components/Snacky";
import { Alert } from "@material-ui/lab";

function TransactionFE({ parentRows, user }: any) {
  const [parentClass, setParentClass] = useState<any>();
  const [columns, setColumns] = useState<any>();

  const [nodesObj, setNodesObj] = useState<any>();

  const [rows, setRows] = useState<any>();

  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [handle, setHandle] = useState(false);
  const [type, setType] = useState<any>();
  const [msg, setMsg] = useState("");

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

                {/* <Button
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
                </Button> */}
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
        let stat = "New";
        if (pr.status == 1) {
          stat = "Approved";
        } else if (pr.status == 2) {
          stat = "Disapproved";
        }

        return {
          timestamp: pr.created_at || "N/A",
          operator: pr?.user[0]?.name || "N/A",
          equipmentName: pr?.equipment[0]?.name || "N/A",
          nextMaint: pr?.next_maint || "N/A",
          status: stat,
          recordedData: pr.recorded_data,
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
        let trans;

        if (a === "recordedData" && current[0][a] !== "null") {
          let recJson = JSON.parse(
            current[0][a].replaceAll("'", '"').replaceAll(/(\r\n|\n|\r)/gm, " ")
          );

          console.log(recJson);

          trans = (
            <Paper elevation={10} style={{ margin: "10px", padding: "10px" }}>
              <h4>
                <b>{`${usefulServices.capitalizeFirstLetter(a)}`}</b>
              </h4>
              <Divider />
              <div style={{ margin: "10px" }}>
                {Object.keys(recJson).map((rj: any, indrj) => {
                  return rj === "comment" ? (
                    <div>
                      <p>
                        <u>
                          <b>
                            {" "}
                            {`${usefulServices.capitalizeFirstLetter(
                              rj
                            )}s`}{" "}
                          </b>
                        </u>
                      </p>
                      <i>{`${usefulServices.capitalizeFirstLetter(
                        recJson[rj]
                      )}`}</i>
                    </div>
                  ) : (
                    <p>
                      <b>{`${usefulServices.capitalizeFirstLetter(rj)}`}</b>
                      {`: ${recJson[rj]}`}
                    </p>
                  );
                })}
              </div>
            </Paper>
          );
          console.log(Object.keys(recJson));
        } else {
          trans = (
            <Paper elevation={10} style={{ margin: "10px", padding: "10px" }}>
              <h4>
                <b>{`${usefulServices.capitalizeFirstLetter(a)}`}</b>
              </h4>
              <Divider />
              <div style={{ margin: "10px" }}>
                <i>Not Available</i>
              </div>
            </Paper>
          );
        }

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
              display: "none",
              justifyContent: "space-between",
            }}
          >
            {buttons}
          </Paper>
        ) : a === "recordedData" ? (
          trans
        ) : (
          <Paper elevation={10} style={{ margin: "10px", padding: "10px" }}>
            <b>{`${usefulServices.capitalizeFirstLetter(a)}`}</b>
            {`: ${current[0][a]}`}
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
        setHandle(true);
        setType("error");
        setMsg(resJson.json.message);
      }
      if (res.res === "success") {
        setHandle(true);
        setType("success");
        setMsg("Operation was Successful");
        setErrorMessage("");
      }
    } catch (err) {
      console.log(err);
      setHandle(true);
      setType("error");
      setMsg("Something Broke, Please try again or contact Admin");
      console.log(err);
      setHandle(true);
      setType("error");
      setMsg("Something Broke, Please try again or contact Admin");
      setErrorMessage("Something Broke, Please try again or contact Admin");
    }
    setTimeout(() => window.location.reload(), 3000);

    // window.location.reload();
  };

  const refresh = (ev: any) => {
    window.location.reload();
  };

  const filterRows = (ev: any) => {
    let val = ev.target.value;
    let oldRows = rows;
    let newRows = oldRows.filter((i: any) => {
      let keys = Object.keys(i);
      console.log(keys);

      let filty = keys.filter((k: any) => {
        return (
          i[k].toString().toLowerCase().indexOf(val.toString().toLowerCase()) >
          -1
        );
      });
      console.log(filty);

      return filty.length;
    });

    console.log(newRows);

    setRows(newRows);
  };

  return (
    <div>
      {handle && (
        <Alert
          onClose={() => {
            window.location.reload();
          }}
          severity={type}
          style={styles.bottom}
        >
          {msg}
        </Alert>
      )}
      {loading && <LinearProgress />}
      <div style={styles.top}></div>

      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
        // style={styles.top}
      >
        <Typography color="primary" variant="subtitle1">
          <b>Fire Extinguishers Transactions</b>
        </Typography>

        <div>
          {rows && (
            <>
              <TextField
                id="outlined-search"
                label="Filter"
                type="search"
                variant="outlined"
                size="small"
                onChange={filterRows}
              />
              <Refresh
                onClick={refresh}
                style={{ color: "#3F51B5", marginTop: "9px" }}
              />
            </>
          )}
        </div>

        <div>
          {rows && <span style={{ color: "#3F51B5" }}>Export Data</span>}
          {`  `}
          {rows && parentClass && (
            <Button
              variant="outlined"
              className={clsx(parentClass.textGreen, parentClass.outlinedGreen)}
              size="small"
              onClick={() => usefulServices.csv(rows, "csvDowload", "csv")}
            >
              CSV
            </Button>
          )}
          {` `}
          {rows && (
            <Button
              variant="outlined"
              color="primary"
              size="small"
              onClick={() => usefulServices.csv(rows, "xlsDownload", "xls")}
            >
              Xls
            </Button>
          )}
          {` `}
          {rows && (
            <Button
              variant="outlined"
              color="secondary"
              size="small"
              onClick={() => usefulServices.pdf(rows, "pdfDownload", "pdf")}
              // disabled={true}
            >
              PDF
            </Button>
          )}
        </div>

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

      {/* <Snacky handle={handle} type={type} message={msg} /> */}
    </div>
  );
}

export default TransactionFE;
