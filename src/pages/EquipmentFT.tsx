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
import GlobalServices from "../services/GlobalServices";
import usefulServices from "../services/usefulServices";
import AppForm from "../components/AppForm";
import AppEmpty from "../components/AppEmpty";
import { Refresh } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";

function EquipmentFT({ parentRows, user }: any) {
  // const [user, setUser] = useState<any>();

  const [parentClass, setParentClass] = useState<any>();
  const [columns, setColumns] = useState<any>();

  const [nodesObj, setNodesObj] = useState<any>();
  const [edit, setEdit] = useState<boolean>(false);
  const [currentId, setCurrentId] = useState<number>();
  const [allLocs, setAllLocs] = useState<any>();

  const [name, setName] = useState("");
  const [place, setPlace] = useState<any>("");
  const [location, setLocation] = useState<any>();

  const [addName, setAddName] = useState("");
  const [addPlace, setAddPlace] = useState<any>("");
  const [addLocation, setAddLocation] = useState<string[]>([]);

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
    if (parentClass && rows && allLocs) {
      setColumns([
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
                <AppDrawer
                  variant="outlined"
                  parentClass={parentClass}
                  className={["textGreen", "outlinedGreen"]}
                  size="small"
                  content={viewContent(value)}
                  drawerText="View"
                />

                <AppDrawer
                  variant="outlined"
                  parentClass={parentClass}
                  className={["textOrange", "outlinedOrange"]}
                  size="small"
                  content={editContent(value)}
                  drawerText="Edit"
                />

                <Button
                  variant="outlined"
                  className={clsx(
                    parentClass.textCyan,
                    parentClass.outlinedCyan
                  )}
                  color="inherit"
                  size="small"
                  onClick={() => toggler(value)}
                >
                  Toggle
                </Button>

                <Button
                  variant="outlined"
                  className={clsx(parentClass.textRed, parentClass.outlinedRed)}
                  size="small"
                  onClick={() => disabler(value)}
                >
                  Disable
                </Button>
              </div>
            );
          },
        },
      ]);
    }
  }, [parentClass, rows, allLocs]);

  useEffect(() => {
    if (parentRows) {
      console.log(parentRows);

      let nO: any[] = [];
      let prs: any[] = parentRows;
      let newRows = [];
      for (const [key, value] of Object.entries(prs)) {
        nO.push(value);
        newRows.push({
          name: value?.name,
          location: value?.location[0].name,
          locationPlacement: value?.location_place,
          lastMaint:
            value.transactions[value.transactions.length - 1]?.created_at ||
            "N/A",
          nextMaint:
            value.transactions[value.transactions.length - 1]?.next_maint ||
            "N/A",
          status: value.status == 1 ? "Active" : "Inactive",
          actions: value.id,
        });
      }
      console.log(nO);

      setNodesObj(nO);

      setRows(newRows);
    }
  }, [parentRows]);

  useEffect(() => {
    const loadLocs = async () => {
      if (user) {
        setLoading(true);

        try {
          const res = await GlobalServices.generic(null, "GET", "Locations", {
            Authorization: "Bearer " + user?.api_token,
          });
          let resJson = await res;
          console.log(resJson);
          setLoading(false);

          if (res.res === "error") {
            if (resJson.json.message === "Unauthenticated.") {
              history.push(`/login`);
              return;
            }
            setHandle(true);
            setType("error");
            setMsg(resJson.json.message);
          }
          if (res.res === "success") {
            console.log(res);
            // return;

            // let locs = res.json.data.locations;
            let locs =
              user.type === "area" || user.type === "location"
                ? res.json.data
                : res.json.data.locations;
            console.log(locs);

            setAllLocs(locs);

            // return locs;
          }
        } catch (err) {
          console.log(err);
          setHandle(true);
          setType("error");
          setMsg("Something Broke, Please try again or contact Admin");
          console.log(err);
        }
      }
      return false;
    };

    loadLocs();
  }, [user]);

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
            <AppDrawer
              variant="outlined"
              parentClass={parentClass}
              className={["textOrange", "outlinedOrange"]}
              size="small"
              content={editContent(id)}
              drawerText="Edit"
            />

            <Button
              variant="outlined"
              className={clsx(parentClass.textCyan, parentClass.outlinedCyan)}
              color="inherit"
              size="small"
              onClick={() => toggler(id)}
            >
              Toggle
            </Button>

            <Button
              variant="outlined"
              className={clsx(parentClass.textRed, parentClass.outlinedRed)}
              size="small"
              onClick={() => disabler(id)}
            >
              Disable
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
            {`: ${current[0][a]}`}
          </Paper>
        );
      });

      return (
        <Box style={{ margin: "10px" }} width={450}>
          <Typography color="primary" variant="h6">
            View{" "}
            <strong>
              <i>
                {usefulServices.capitalizeFirstLetter(current[0]["name"])}'s{" "}
              </i>
            </strong>
            details
          </Typography>
          <Divider />
          <br />

          {content}
        </Box>
      );
    }
    return "Not Available";
  };

  const editContent = (id: any) => {
    if (rows && nodesObj) {
      let current = nodesObj.filter((ao: any) => {
        return ao.id === id;
      });

      const fields = [
        {
          name: "name",
          value: name,
          required: false,
          label: "Name",
          type: "text",
          placeholder: "",
          variant: "filled",
          setter: setName,
          disabled: false,
          defaultValue: current[0].name,
          span: 12,
        },
        {
          name: "place",
          value: place,
          required: false,
          label: "Location Placement",
          type: "text",
          placeholder: "",
          variant: "filled",
          setter: setPlace,
          disabled: false,
          defaultValue: current[0].location_place,
          span: 12,
        },
        {
          name: "location",
          value: location,
          required: false,
          label: "Location",
          type: "select",
          placeholder: "",
          variant: "filled",
          setter: setLocation,
          disabled: false,
          defaultValue: current[0].location_id,
          options: allLocs,
          span: 12,
        },
      ];

      console.log(current[0], fields);

      return (
        <Box style={{ margin: "10px" }} width={450}>
          <Typography color="primary" variant="h6">
            Edit{" "}
            <strong>
              <i>
                {usefulServices.capitalizeFirstLetter(current[0]["name"])}'s{" "}
              </i>
            </strong>
            details
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
          </Typography>
          <Divider />

          <div style={{ margin: "10px", padding: "10px" }}>
            <AppForm
              fields={fields}
              submitString="Update"
              submitButtonMethod={() => submitParams(id, true)}
              buttonDisabled={false}
              submitButtonPosition="center"
            />
          </div>
        </Box>
      );
    }
    return "Not Available";
  };

  useEffect(() => {
    console.log(name);
    console.log(place);
    console.log(location);
    console.log(edit);
    let obj: any = {
      name: name,
      location_place: place,
      location_id: location,
    };

    if (currentId && edit) {
      handleEdit(currentId, obj);
    }
  }, [name, place, edit, currentId, location]);

  const submitParams = (id: any, ed: any) => {
    console.log(id, ed);

    setCurrentId(id);
    setEdit(ed);
    console.log(id, ed);
  };

  const handleEdit = async (id: any, obj: any) => {
    if (
      obj.name.length < 3 &&
      obj.location_place.length < 3 &&
      obj.location_id === undefined
    ) {
      console.log(id, "handle edit");
      setEdit(false);

      return;
    } else {
      console.log(id, "handle edit", obj);
    }
    setLoading(true);

    try {
      if (obj.name.length < 3) {
        delete obj.name;
      }
      if (obj.location_place.length < 3) {
        delete obj.location_place;
      }
      if (obj.location_id === undefined) {
        delete obj.location_place;
      }

      if (Object.keys(obj).length === 0) {
        console.log("how did it even get here");
        setEdit(false);

        return;
      }
      const res = await GlobalServices.generic(obj, "PUT", "Equipments/" + id, {
        Authorization: "Bearer " + user?.api_token,
      });
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
      setErrorMessage("Something Broke, Please try again or contact Admin");
    }
    console.log("resetting edit");

    setEdit(false);
    setTimeout(() => window.location.reload(), 3000);
  };

  const toggler = async (id: any) => {
    console.log(id);

    let current = nodesObj.filter((ao: any) => {
      return ao.id === id;
    });

    let status = current[0].status == 1 ? 0 : 1;
    console.log(current[0].status, status);
    setLoading(true);

    try {
      const res = await GlobalServices.generic(
        { status },
        "PUT",
        "Equipments/" + id,
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
      setErrorMessage("Something Broke, Please try again or contact Admin");
    }
    setTimeout(() => window.location.reload(), 3000);

    // window.location.reload();
  };

  const disabler = async (id: any) => {
    alert("To do later");
  };

  const addfields = [
    {
      name: "name",
      value: addName,
      required: false,
      label: "Name",
      type: "text",
      placeholder: "",
      variant: "filled",
      setter: setAddName,
      disabled: false,
      span: 12,
    },
    {
      name: "place",
      value: addPlace,
      required: false,
      label: "Location Placement",
      type: "text",
      placeholder: "",
      variant: "filled",
      setter: setAddPlace,
      disabled: false,
      span: 12,
    },
    {
      name: "location",
      value: addLocation,
      required: false,
      label: "Location",
      type: "select",
      placeholder: "",
      variant: "filled",
      setter: setAddLocation,
      disabled: false,
      options: allLocs,
      span: 12,
    },
  ];

  const addContent = () => {
    if (addfields) {
      return (
        <Box style={{ margin: "10px" }} width={450}>
          <Typography color="primary" variant="h6">
            Add New Equipment
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
          </Typography>
          <Divider />

          <div style={{ margin: "10px", padding: "10px" }}>
            <AppForm
              fields={addfields}
              submitString="Save"
              submitButtonMethod={handleAdd}
              buttonDisabled={false}
              submitButtonPosition="center"
            />
          </div>
        </Box>
      );
    }

    return "Not Available";
  };

  const handleAdd = async () => {
    console.log(addName, addPlace, addLocation);

    if (
      addName.length < 3 ||
      addPlace.length < 3 ||
      addLocation === undefined
    ) {
      console.log("handle add validate");

      return;
    }

    console.log(user);

    // return;
    setLoading(true);

    try {
      const res = await GlobalServices.generic(
        {
          name: addName,
          location_place: addPlace,
          status: 0,
          location_id: addLocation,
          type: "B",
        },
        "POST",
        "Equipments",
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
      setErrorMessage("Something Broke, Please try again or contact Admin");
    }
    setTimeout(() => window.location.reload(), 3000);
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
          <b>Manage Fire Trucks</b>
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
        {user && (
          <AppDrawer
            variant="outlined"
            parentClass={parentClass}
            className={["textGreen", "outlinedGreen"]}
            size="small"
            content={addContent()}
            drawerText="View"
            type="fab"
            fabIcon={<AddIcon />}
          />
        )}
      </Grid> */}
    </div>
  );
}

export default EquipmentFT;
