import React, { useEffect, useState } from "react";
import AppFrame from "../components/AppFrame";
import { Box, Tabs, Tab, LinearProgress } from "@material-ui/core";
import UserCompany from "./UserCompany";
import UserArea from "./UserArea";
import UserLocation from "./UserLocation";
import usefulServices from "../services/usefulServices";
import { useHistory } from "react-router-dom";
import GlobalServices from "../services/GlobalServices";
import { Alert } from "@material-ui/lab";

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

function User() {
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

  const [value, setValue] = useState(0);
  const [user, setUser] = useState<any>();

  const [coy, setCoy] = useState<any>();
  const [area, setArea] = useState<any>();
  const [loc, setLoc] = useState<any>();

  const [errorMessage, setErrorMessage] = useState("");

  const [loading, setLoading] = useState(false);

  const [handle, setHandle] = useState(false);
  const [type, setType] = useState<any>();
  const [msg, setMsg] = useState("");

  let history = useHistory();

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    const loadDash = async () => {
      if (user) {
        setLoading(true);

        try {
          const res = await GlobalServices.generic(null, "GET", "Users", {
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
            console.log(res);
            // return;

            let all = res.json.data.users;
            let coyu =
              user.type === "area"
                ? null
                : all
                    .filter((user: any) => {
                      return user.type === "company";
                    })
                    .map((c: any) => {
                      let company = res.json.data;
                      delete company.users;
                      return { ...c, company };
                    });

            let areau =
              user.type === "area"
                ? res.json.data.areaUsers
                : all.filter((user: any) => {
                    return user.type === "area";
                  });

            let locu =
              user.type === "area" || user.type === "location"
                ? res.json.data.locUsers
                : all.filter((user: any) => {
                    return user.type === "location";
                  });

            console.log(coyu, areau, locu);

            setCoy(coyu);
            setArea(areau);
            setLoc(locu);

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
      }
    };

    loadDash();
  }, [user]);

  return (
    <AppFrame
      headerText={
        user
          ? `Welcome Back, ${usefulServices.capitalizeFirstLetter(user?.name)}`
          : "Welcome Back, User"
      }
      headerTextPosition="flex-start"
      headerTextSize="h5"
      frameTitle="Users Management"
      userGetter={setUser}
      loading={loading}
    >
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
      {/* {loading && <LinearProgress />} */}
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        {user && user.type !== "area" && user.type !== "location" && (
          <Tab label="Company Users" />
        )}
        {user && user.type !== "location" && <Tab label="Area Users" />}
        <Tab label="Location Users" />
      </Tabs>

      {user && user.type !== "area" && user.type !== "location" && (
        <TabPanel value={value} index={0}>
          {coy ? <UserCompany parentRows={coy} user={user} /> : <UserCompany />}
        </TabPanel>
      )}
      {user && user.type !== "location" && (
        <TabPanel value={value} index={user.type === "area" ? 0 : 1}>
          {area ? <UserArea parentRows={area} user={user} /> : <UserArea />}
        </TabPanel>
      )}
      {user && (
        <TabPanel
          value={value}
          index={user.type === "area" ? 1 : user.type === "location" ? 0 : 2}
        >
          {loc ? (
            <UserLocation parentRows={loc} user={user} />
          ) : (
            <UserLocation />
          )}
        </TabPanel>
      )}
    </AppFrame>
  );
}

export default User;
