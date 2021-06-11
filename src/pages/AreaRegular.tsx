import Fab from "@material-ui/core/Fab";
import Grid from "@material-ui/core/Grid";
import React, { useEffect, useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import AppFrame from "../components/AppFrame";
import Typography from "@material-ui/core/Typography";
import AppTable from "../components/AppTable";
import { Box, Button, Divider, LinearProgress, Paper } from "@material-ui/core";
import clsx from "clsx";
import usefulServices from "../services/usefulServices";
import GlobalServices from "../services/GlobalServices";
import { useHistory } from "react-router-dom";
import AppDrawer from "../components/AppDrawer";
import AppForm from "../components/AppForm";
import AppEmpty from "../components/AppEmpty";

function AreaRegular({ user }: any) {
  // const [user, setUser] = useState<any>();

  const [parentClass, setParentClass] = useState<any>();
  const [columns, setColumns] = useState<any>();
  const [rows, setRows] = useState<any>();
  const [areasObj, setAreasObj] = useState<any>();

  const [errorMessage, setErrorMessage] = useState("");
  const [name, setName] = useState("");
  const [nickName, setNickName] = useState<any>("");
  const [locations, setLocations] = useState<string[]>([]);

  const [addName, setAddName] = useState("");
  const [addNickName, setAddNickName] = useState<any>("");
  const [addLocations, setAddLocations] = useState<string[]>([]);

  const [disableName, setDisableName] = useState<boolean>(false);
  const [allLocs, setAllLocs] = useState<any>();
  const [edit, setEdit] = useState<boolean>(false);
  const [currentId, setCurrentId] = useState<number>();

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

  const csvRows = () => {
    usefulServices.csv(rows, "test", "csv");
  };

  useEffect(() => {
    if (parentClass && rows && allLocs) {
      setColumns([
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
            console.log(value);

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
                  // content="some stuff"
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

  let areas: any;

  useEffect(() => {
    const loadDash = async () => {
      if (user) {
        const types = usefulServices.getAreaTypes();

        if (!types.includes(user.type)) {
          history.push(`/dashboard`);
          return;
        }
        setLoading(true);

        try {
          const res = await GlobalServices.generic(null, "GET", "Areas", {
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
          }
          if (res.res === "success") {
            console.log(res);

            areas = res.json.data.areas;

            setAreasObj(areas);

            let areasEquipmentCount = res.json.data.areasEquipmentCount;
            console.log(areas);
            console.log(areasEquipmentCount);

            let eqCount = areasEquipmentCount.map((aec: any) => {
              let total = 0;
              for (let loc of aec) {
                total += loc.equipments.length;
              }

              return total;
            });

            console.log(eqCount);

            areas = areas.map((area: any, ind: number) => {
              return {
                name: area.name + " (" + area.nickname + ")",
                users: area.users.length,
                equipments: eqCount[ind],
                locations: JSON.parse(area.locations).length,
                status: area.status,
                actions: area.id,
              };
            });

            setRows(areas);

            setErrorMessage("");
          }
        } catch (err) {
          console.log(err);
          setErrorMessage("Something Broke, Please try again or contact Admin");
        }
      }
    };

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
          }
          if (res.res === "success") {
            console.log(res);
            // return;

            let locs = res.json.data.locations;
            console.log(locs);

            setAllLocs(locs);

            // return locs;
          }
        } catch (err) {
          console.log(err);
        }
      }
      return false;
    };

    loadDash();
    loadLocs();
  }, [user]);

  useEffect(() => {
    console.log(locations);
    console.log(name);
    console.log(nickName);
    console.log(edit);
    let obj: any = {
      name: name,
      nickname: nickName,
      locations: JSON.stringify(locations),
    };

    if (currentId && edit) {
      handleEdit(currentId, obj);
    }
  }, [locations, name, nickName, edit, currentId]);

  const submitParams = (id: any, ed: any) => {
    console.log(id, ed);

    setCurrentId(id);
    setEdit(ed);
    console.log(id, ed);
  };

  const handleEdit = async (id: any, obj: any) => {
    console.log(obj.name.length);
    console.log(JSON.parse(obj.locations).length);

    if (
      obj.name.length < 3 &&
      JSON.parse(obj.locations).length < 1 &&
      obj.nickname.length < 3
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
      if (obj.nickname.length < 3) {
        delete obj.nickname;
      }
      if (JSON.parse(obj.locations).length < 1) {
        delete obj.locations;
      }

      if (Object.keys(obj).length === 0) {
        console.log("how did it even get here");
        setEdit(false);

        return;
      }
      const res = await GlobalServices.generic(obj, "PUT", "Areas/" + id, {
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
      }
      if (res.res === "success") {
        setErrorMessage("");
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
      setErrorMessage("Something Broke, Please try again or contact Admin");
    }
    console.log("resetting edit");

    setEdit(false);
  };

  const disabler = async (id: any) => {
    alert("To do later");
  };

  const toggler = async (id: any) => {
    console.log(id);

    let current = areasObj.filter((ao: any) => {
      return ao.id === id;
    });

    let status = current[0].status == 1 ? 0 : 1;
    console.log(current[0].status, status);
    setLoading(true);

    try {
      const res = await GlobalServices.generic(
        { status },
        "PUT",
        "Areas/" + id,
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

  const editContent = (id: any) => {
    if (rows && areasObj) {
      let current = areasObj.filter((ao: any) => {
        return ao.id === id;
      });

      // console.log(current, allLocs);

      if (locations === []) {
        console.log(locations);
        setLocations(JSON.parse(current[0].locations));
      } else {
        // console.log(locations);
      }
      // setName(current[0].name);
      // setName(current[0].nickname);

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
          name: "nickName",
          value: nickName,
          required: false,
          label: "Nick Name",
          type: "text",
          placeholder: "",
          variant: "filled",
          setter: setNickName,
          disabled: false,
          defaultValue: current[0].nickname,
          span: 12,
        },
        {
          name: "locations",
          value: locations,
          required: false,
          label: "Locations",
          type: "selectMultiple",
          placeholder: "",
          variant: "filled",
          setter: setLocations,
          disabled: false,
          defaultValue: JSON.parse(current[0].locations),
          // options: [],
          options: allLocs,
          span: 12,
        },
      ];

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
      name: "nickName",
      value: addNickName,
      required: false,
      label: "Nick Name",
      type: "text",
      placeholder: "",
      variant: "filled",
      setter: setAddNickName,
      disabled: false,
      span: 12,
    },
    {
      name: "locations",
      value: addLocations,
      required: false,
      label: "Locations",
      type: "selectMultiple",
      placeholder: "",
      variant: "filled",
      setter: setAddLocations,
      disabled: false,
      defaultValue: [],
      options: allLocs,
      span: 12,
      new: true,
    },
  ];

  const addContent = () => {
    if (allLocs && addfields) {
      return (
        <Box style={{ margin: "10px" }} width={450}>
          <Typography color="primary" variant="h6">
            Add New Area
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
    console.log(addName, addNickName, addLocations);

    if (
      addName.length < 3 ||
      addLocations.length < 1 ||
      addNickName.length < 3
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
          nickname: addNickName,
          locations: JSON.stringify(addLocations),
          status: 0,
          company_id: user.company_id,
        },
        "POST",
        "Areas",
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
        console.log(res);

        window.location.reload();

        setErrorMessage("");
      }
    } catch (err) {
      console.log(err);
      setErrorMessage("Something Broke, Please try again or contact Admin");
    }
  };

  const viewContent = (id: any) => {
    console.log(rows, id, areasObj);

    if (rows && areasObj) {
      let current = rows.filter((row: any) => {
        return row.actions === id;
      });

      console.log(current, areasObj);

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
            {a === "status"
              ? `: ${current[0][a] == 1 ? "Active" : "Inactive"}`
              : `: ${current[0][a]}`}
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

  return (
    <>
      {loading && <LinearProgress />}
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
        style={styles.top}
      >
        <Typography color="primary" variant="subtitle1">
          <b>Manage All</b>
        </Typography>

        <div>
          {rows && <span style={{ color: "#3F51B5" }}>Export Data</span>}
          {`  `}
          {rows && (
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
              onClick={csvRows}
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
        {allLocs && user && (
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
    </>
  );
}

export default AreaRegular;
