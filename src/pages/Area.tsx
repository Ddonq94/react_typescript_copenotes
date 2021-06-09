import Fab from "@material-ui/core/Fab";
import Grid from "@material-ui/core/Grid";
import React, { useEffect, useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import AppFrame from "../components/AppFrame";
import Typography from "@material-ui/core/Typography";
import AppTable from "../components/AppTable";
import { Box, Button, Divider, Paper } from "@material-ui/core";
import clsx from "clsx";
import usefulServices from "../services/usefulServices";
import GlobalServices from "../services/GlobalServices";
import { useHistory } from "react-router-dom";
import AppDrawer from "../components/AppDrawer";
import AppForm from "../components/AppForm";
import AreaRegular from "./AreaRegular";
import AreaAdmin from "./AreaAdmin";

function Area() {
  const [user, setUser] = useState<any>();
  let history = useHistory();

  useEffect(() => {
    const loadDash = async () => {
      if (user) {
        const types = usefulServices.getAreaTypes();

        if (!types.includes(user.type)) {
          history.push(`/dashboard`);
          return;
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
      frameTitle="Area Management"
      userGetter={setUser}
    >
      {user ? (
        user.type === "company" ? (
          <AreaRegular user={user} />
        ) : (
          <AreaAdmin user={user} userSetter={setUser} />
        )
      ) : null}
    </AppFrame>
  );
}

export default Area;
