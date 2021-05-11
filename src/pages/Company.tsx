import Typography from "@material-ui/core/Typography";
import React from "react";
import AppCards from "../components/AppCards";
import AppForm from "../components/AppForm";
import AppFrame from "../components/AppFrame";

function Company() {
  let fields = [
    {
      name: "companyName",
      required: true,
      label: "Company Name",
      type: "text",
      placeholder: "Your Company Name",
      variant: "filled",
      disabled: false,
      defaultValue: "",
    },
    {
      name: "companyLogo",
      required: true,
      label: "Company Logo",
      type: "file",
      placeholder: "Your Company Logo",
      variant: "filled",
      disabled: false,
      defaultValue: "",
    },
  ];

  const styles = {
    top: {
      marginBottom: "20px",
    },
    bottom: {
      borderBottom: "1px solid #707070",
      marginTop: "110px",
      marginBottom: "20px",
    },
  };

  const cardsObj = [
    {
      header: "Number of Users",
      type: 1,
      middleText: ["400"],
      footerText: ["Manage"],
      footerLink: ["/user"],
      bgColor: "#E97272",
    },
    {
      header: "Number of Equipments",
      type: 1,
      middleText: ["100"],
      footerText: ["Manage"],
      footerLink: ["/equipment"],
      bgColor: "#EFC75A",
    },
    {
      header: "Number of Sub-Nodes",
      type: 2,
      middleText: ["20", "30"],
      footerText: ["Areas", "Locations"],
      footerLink: ["/area", "/location"],
      bgColor: "#469EE1",
    },
  ];

  return (
    <AppFrame
      headerText="Welcome Back, Sean Uthman"
      headerTextPosition="flex-start"
      headerTextSize="h5"
      frameTitle="Company Management"
    >
      <div style={styles.top}></div>
      <AppCards obj={cardsObj} />

      <Typography
        style={styles.bottom}
        color="primary"
        variant="h5"
        component="h2"
      >
        Company Information
      </Typography>

      <AppForm fields={fields} submitString="Update" />
    </AppFrame>
  );
}

export default Company;
