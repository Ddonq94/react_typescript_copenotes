import React from "react";
import AppFrame from "../components/AppFrame";
import { Box, Tabs, Tab } from "@material-ui/core";
import UserCompany from "./UserCompany";
import UserArea from "./UserArea";
import UserLocation from "./UserLocation";

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

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <AppFrame
      headerText="Welcome Back, Sean Uthman"
      headerTextPosition="flex-start"
      headerTextSize="h5"
      frameTitle="Users Management"
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
        <UserCompany />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <UserArea />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <UserLocation />
      </TabPanel>
    </AppFrame>
  );
}

export default User;
