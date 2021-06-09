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
import AppCards from "../components/AppCards";

function AreaAdmin({ user, userSetter }: any) {
  const [cardsObj, setCardsObj] = useState([]);
  const [fields, setFields] = useState<any>();

  const [errorMessage, setErrorMessage] = useState("");
  const [name, setName] = useState("");
  const [nickName, setNickName] = useState<any>("");
  // const [locations, setLocations] = useState<string[]>([]);
  const [allLocs, setAllLocs] = useState<any>();

  const [disableName, setDisableName] = useState<boolean>(true);

  let history = useHistory();

  const styles = {
    top: {
      marginTop: "20px",
    },
    bottom: {
      marginBottom: "30px",
    },
    table: {
      marginTop: "20px",
      marginBottom: "40px",
    },
  };

  useEffect(() => {
    const loadDash = async () => {
      if (user) {
        try {
          const res = await GlobalServices.dashboard({
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
            setCardsObj(resJson.json.data.slice(3));

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

  useEffect(() => {
    console.log(name, nickName);
    if (name.length < 3 && nickName.length < 3) {
      setDisableName(true);
    } else {
      setDisableName(false);
    }
  }, [name, nickName]);

  const handleEdit = async () => {
    let obj: any = {
      name: name,
      nickname: nickName,
      // locations: JSON.stringify(locations),
    };

    try {
      if (obj.name.length < 3) {
        delete obj.name;
      }
      if (obj.nickname.length < 3) {
        delete obj.nickname;
      }
      // if (JSON.parse(obj.locations).length < 1) {
      //   delete obj.locations;
      // }

      if (Object.keys(obj).length === 0) {
        console.log("how did it even get here");

        return;
      }

      const res = await GlobalServices.generic(
        obj,
        "PUT",
        "Areas/" + user.area[0].id,
        {
          Authorization: "Bearer " + user?.api_token,
        }
      );
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
        let oldUser = JSON.parse(sessionStorage.getItem("user") || "");
        let oldArea = oldUser?.data?.area[0];
        let newArea = Object.assign(oldArea, resJson.json);
        oldUser.data.area[0] = newArea;
        let newUser = oldUser;
        console.log(newUser);

        sessionStorage.setItem("user", JSON.stringify(newUser));

        userSetter(newUser.data);

        setErrorMessage("");
      }
    } catch (err) {
      console.log(err);
      setErrorMessage("Something Broke, Please try again or contact Admin");
    }
  };

  useEffect(() => {
    if (user) {
      setFields([
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
          defaultValue: user.area[0].name,
          span: 6,
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
          defaultValue: user.area[0].nickname,
          span: 6,
        },
        // {
        //   name: "locations",
        //   value: locations,
        //   required: false,
        //   label: "Locations",
        //   type: "selectMultiple",
        //   placeholder: "",
        //   variant: "filled",
        //   setter: setLocations,
        //   disabled: false,
        //   defaultValue: JSON.parse(user.area[0].locations),
        //   // options: [],
        //   options: allLocs,
        //   span: 4,
        // },
      ]);
    }
  }, [user]);

  return (
    <>
      <div style={styles.top} />
      <AppCards obj={cardsObj} />
      <div style={styles.bottom} />

      <Typography
        style={styles.bottom}
        color="primary"
        variant="h5"
        component="h2"
      >
        Area Information
        <Divider />
      </Typography>

      <AppForm
        fields={fields}
        submitString="Update"
        submitButtonMethod={handleEdit}
        buttonDisabled={disableName}
      />
    </>
  );
}

export default AreaAdmin;
