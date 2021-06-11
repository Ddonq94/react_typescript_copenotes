import Fab from "@material-ui/core/Fab";
import Grid from "@material-ui/core/Grid";
import React, { useEffect, useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import AppFrame from "../components/AppFrame";
import Typography from "@material-ui/core/Typography";
import AppTable from "../components/AppTable";
import { Link, useHistory } from "react-router-dom";
import { Box, Button, Divider, Paper } from "@material-ui/core";
import usefulServices from "../services/usefulServices";
import clsx from "clsx";
import GlobalServices from "../services/GlobalServices";
import AppDrawer from "../components/AppDrawer";
import AppForm from "../components/AppForm";
import LocationAdmin from "./LocationAdmin";
import LocationRegular from "./LocationRegular";

function Location() {
  const [user, setUser] = useState<any>();
  const [loading, setLoading] = useState(false);

  let history = useHistory();

  return (
    <AppFrame
      headerText={
        user
          ? `Welcome Back, ${usefulServices.capitalizeFirstLetter(user?.name)}`
          : "Welcome Back, User"
      }
      headerTextPosition="flex-start"
      headerTextSize="h5"
      frameTitle="Location Management"
      userGetter={setUser}
      loading={loading}
    >
      {user ? (
        user.type === "location" ? (
          <LocationAdmin user={user} userSetter={setUser} />
        ) : (
          <LocationRegular user={user} />
        )
      ) : null}
    </AppFrame>
  );
}

export default Location;
