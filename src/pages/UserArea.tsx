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
import AppForm from "../components/AppForm";
import GlobalServices from "../services/GlobalServices";
import AppEmpty from "../components/AppEmpty";
import { Refresh } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";

function UserArea({ parentRows, user }: any) {
  const [parentClass, setParentClass] = useState<any>();
  const [columns, setColumns] = useState<any>();
  const [allAreas, setAllAreas] = useState<any>();

  const [nodesObj, setNodesObj] = useState<any>();
  const [edit, setEdit] = useState<boolean>(false);
  const [currentId, setCurrentId] = useState<number>();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [area, setArea] = useState<any>();

  const [addName, setAddName] = useState("");
  const [addEmail, setAddEmail] = useState("");
  const [addPassword, setAddPassword] = useState("");
  const [addCpassword, setAddCpassword] = useState("");
  const [addArea, setAddArea] = useState<any>();

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
    if (parentClass && rows && allAreas) {
      setColumns([
        { id: "userName", label: "Username", minWidth: 85 },
        { id: "fullName", label: "Full Name", minWidth: 85 },
        { id: "areaName", label: "Area Name", minWidth: 85 },
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
  }, [parentClass, rows, allAreas]);

  useEffect(() => {
    const loads = async () => {
      if (user) {
        setLoading(true);

        try {
          const res = await GlobalServices.generic(null, "GET", "Areas", {
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

            let areas = res.json.data.areas;
            console.log(areas);

            setAllAreas(areas);

            // return locs;
          }
        } catch (err) {
          console.log(err);
          setHandle(true);
          setType("error");
          setMsg(err || "Something Broke, Please try again or contact Admin");
          console.log(err);
        }
      }
      return false;
    };

    loads();
  }, [user]);

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
          areaName: pr?.area[0].name || "N/A",
          status: pr.status == 1 ? "Active" : "Inactive",
          actions: pr.id,
        };
      });

      setNodesObj(parentRows);

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
                {usefulServices.capitalizeFirstLetter(current[0]["fullName"])}'s{" "}
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
          name: "area",
          value: area,
          required: false,
          label: "Area",
          type: "select",
          placeholder: "",
          variant: "filled",
          setter: setArea,
          disabled: false,
          defaultValue: current[0].area_id,
          options: allAreas,
          span: 12,
        },
        {
          name: "password",
          value: password,
          required: false,
          label: "Password",
          type: "password",
          placeholder: "",
          variant: "filled",
          setter: setPassword,
          disabled: false,
          span: 12,
        },
        {
          name: "cpassword",
          value: cpassword,
          required: false,
          label: "Confirm Password",
          type: "password",
          placeholder: "",
          variant: "filled",
          setter: setCpassword,
          disabled: false,
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
    console.log(password);
    console.log(cpassword);
    console.log(area);
    console.log(edit);
    let obj: any = {
      name: name,
      password: password,
      cpassword: cpassword,
      area_id: area,
    };

    if (currentId && edit) {
      handleEdit(currentId, obj);
    }
  }, [name, password, cpassword, edit, area, currentId]);

  const submitParams = (id: any, ed: any) => {
    console.log(id, ed);

    setCurrentId(id);
    setEdit(ed);
    console.log(id, ed);
  };

  const handleEdit = async (id: any, obj: any) => {
    if (
      obj.name.length < 3 &&
      obj.password.length < 3 &&
      obj.area_id === undefined
    ) {
      console.log(id, "handle edit");
      setEdit(false);

      return;
    } else {
      console.log(id, "handle edit", obj);
    }

    setLoading(true);

    try {
      if (obj.password !== obj.cpassword) {
        return;
      }

      if (obj.name.length < 3) {
        delete obj.name;
      }
      if (obj.password.length < 3) {
        delete obj.password;
      }

      if (obj.area_id === undefined) {
        delete obj.area_id;
      }
      delete obj.cpassword;

      if (Object.keys(obj).length === 0) {
        console.log("how did it even get here");
        setEdit(false);

        return;
      }

      // obj["company_id"] = user.company_id;
      // obj["area_id"] = 0;
      // obj["location_id"] = 0;
      // obj["type"] = "company";
      // obj["status"] = "0";

      const res = await GlobalServices.generic(obj, "PUT", "Users/" + id, {
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
      setMsg(err || "Something Broke, Please try again or contact Admin");
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
        "Users/" + id,
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
      setMsg(err || "Something Broke, Please try again or contact Admin");
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
      name: "email",
      value: addEmail,
      required: false,
      label: "Email",
      type: "email",
      placeholder: "",
      variant: "filled",
      setter: setAddEmail,
      disabled: false,
      span: 12,
    },
    {
      name: "area",
      value: addArea,
      required: false,
      label: "Area",
      type: "select",
      placeholder: "",
      variant: "filled",
      setter: setAddArea,
      disabled: false,
      options: allAreas,
      span: 12,
    },
    {
      name: "password",
      value: addPassword,
      required: false,
      label: "Password",
      type: "password",
      placeholder: "",
      variant: "filled",
      setter: setAddPassword,
      disabled: false,
      span: 12,
    },
    {
      name: "cpassword",
      value: addCpassword,
      required: false,
      label: "Confirm Password",
      type: "password",
      placeholder: "",
      variant: "filled",
      setter: setAddCpassword,
      disabled: false,
      span: 12,
    },
  ];

  const addContent = () => {
    if (addfields) {
      return (
        <Box style={{ margin: "10px" }} width={450}>
          <Typography color="primary" variant="h6">
            Add New User
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
    console.log(addName, addEmail, addPassword, addCpassword);

    if (
      addName.length < 3 ||
      addEmail.length < 3 ||
      addPassword.length < 3 ||
      addPassword !== addCpassword ||
      addArea === undefined
    ) {
      console.log("handle add validate");

      return;
    }

    console.log(user);
    setLoading(true);

    // return;
    try {
      const res = await GlobalServices.generic(
        {
          name: addName,
          email: addEmail,
          password: addPassword,
          company_id: user.company_id,
          area_id: addArea,
          location_id: 0,
          type: "area",
          status: "0",
        },
        "POST",
        "Users",
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
        console.log(res);

        setHandle(true);
        setType("success");
        setMsg("Operation was Successful");
        setErrorMessage("");
      }
    } catch (err) {
      console.log(err);
      setHandle(true);
      setType("error");
      setMsg(err || "Something Broke, Please try again or contact Admin");
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
      >
        <Typography color="primary" variant="subtitle1">
          <b>Manage Area Users</b>
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

      <Grid container justify="flex-end" style={styles.top}>
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
      </Grid>
    </div>
  );
}

export default UserArea;
