import Typography from "@material-ui/core/Typography";
import React from "react";
import AppForm from "../components/AppForm";
import AppFrame from "../components/AppFrame";

function Profile() {
  let fields = [
    {
      name: "userName",
      required: false,
      label: "Username",
      type: "email",
      placeholder: "admin@email.com",
      variant: "filled",
      disabled: false,
      defaultValue: "",
    },
    {
      name: "fullName",
      required: true,
      label: "Fullname (Surname first)",
      type: "text",
      placeholder: "Your Full Name",
      variant: "filled",
      disabled: false,
      defaultValue: "",
    },
  ];

  let fields2 = [
    {
      name: "password",
      required: true,
      label: "Password",
      type: "password",
      placeholder: "********",
      variant: "filled",
      disabled: false,
      defaultValue: "",
    },
    {
      name: "cpassword",
      required: true,
      label: "Confirm Password",
      type: "password",
      placeholder: "********",
      variant: "filled",
      disabled: false,
      defaultValue: "",
    },
  ];

  const styles = {
    top: {
      borderBottom: "1px solid #707070",
      marginTop: "30px",
      marginBottom: "10px",
    },
    bottom: {
      borderBottom: "1px solid #707070",
      marginTop: "70px",
      marginBottom: "10px",
    },
  };

  return (
    <AppFrame
      headerText="Manage Your Profile"
      headerTextPosition="center"
      headerTextSize="h4"
      frameTitle="Profile Management"
    >
      <Typography
        style={styles.top}
        color="primary"
        variant="h5"
        component="h2"
      >
        Basic Information
      </Typography>
      <AppForm fields={fields} submitString="save" />

      <Typography
        style={styles.bottom}
        color="primary"
        variant="h5"
        component="h2"
      >
        Change Password
      </Typography>
      <AppForm fields={fields2} submitString="save" />
    </AppFrame>
  );
}

export default Profile;
