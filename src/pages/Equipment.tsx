import React, { useEffect, useState } from "react";
import AppFrame from "../components/AppFrame";
import {
  AppBar,
  Box,
  Tabs,
  Tab,
  Typography,
  LinearProgress,
} from "@material-ui/core";
import EquipmentFE from "./EquipmentFE";
import EquipmentFT from "./EquipmentFT";
import usefulServices from "../services/usefulServices";
import GlobalServices from "../services/GlobalServices";
import { useHistory } from "react-router-dom";
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

function Equipment() {
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
  const [fe, setFe] = useState<any>();
  const [ft, setFt] = useState<any>();
  const [loading, setLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

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
          const res = await GlobalServices.generic(null, "GET", "Equipments", {
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

            let feEq = res.json.data.equipmentsFE;
            let ftEq = res.json.data.equipmentsFT;

            console.log(feEq, ftEq);

            setFe(feEq);
            setFt(ftEq);

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
      frameTitle="Equipment Management"
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
        <Tab label="Fire Extinguisher" />
        <Tab label="Fire Truck" />
      </Tabs>

      <TabPanel value={value} index={0}>
        {fe ? <EquipmentFE parentRows={fe} user={user} /> : <EquipmentFE />}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {ft ? <EquipmentFT parentRows={ft} user={user} /> : <EquipmentFT />}
      </TabPanel>
    </AppFrame>
  );
}

export default Equipment;
