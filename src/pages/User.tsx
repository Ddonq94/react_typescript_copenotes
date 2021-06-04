import React, { useEffect, useState } from "react";
import AppFrame from "../components/AppFrame";
import { Box, Tabs, Tab } from "@material-ui/core";
import UserCompany from "./UserCompany";
import UserArea from "./UserArea";
import UserLocation from "./UserLocation";
import usefulServices from "../services/usefulServices";
import { useHistory } from "react-router-dom";
import GlobalServices from "../services/GlobalServices";

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
  let history = useHistory();

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    const loadDash = async () => {
      if (user) {
        try {
          const res = await GlobalServices.generic(null, "GET", "Users", {
            Authorization: "Bearer " + user?.api_token,
          });
          let resJson = await res;
          console.log(resJson);
          if (res.res === "error") {
            setErrorMessage(resJson.json.message);
            if (resJson.json.message === "Unauthenticated.") {
              history.push(`/login`);
              return;
            }
          }
          if (res.res === "success") {
            console.log(res);
            // return;

            let all = res.json.data.users;
            let coyu = all
              .filter((user: any) => {
                return user.type === "company";
              })
              .map((c: any) => {
                let company = res.json.data;
                delete company.users;
                return { ...c, company };
              });

            let areau = all.filter((user: any) => {
              return user.type === "area";
            });
            let locu = all.filter((user: any) => {
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
    >
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Company Users" />
        <Tab label="Area Users" />
        <Tab label="Location Users" />
      </Tabs>

      <TabPanel value={value} index={0}>
        {coy ? <UserCompany parentRows={coy} /> : <UserCompany />}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {area ? <UserArea parentRows={area} /> : <UserArea />}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {loc ? <UserLocation parentRows={loc} /> : <UserLocation />}
      </TabPanel>
    </AppFrame>
  );
}

export default User;
