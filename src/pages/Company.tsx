import { LinearProgress } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { Divider } from "antd";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import AppCards from "../components/AppCards";
import AppForm from "../components/AppForm";
import AppFrame from "../components/AppFrame";
import GlobalServices from "../services/GlobalServices";
import usefulServices from "../services/usefulServices";

function Company() {
  const [cardsObj, setCardsObj] = useState([]);
  const [fields, setFields] = useState<any>();

  const [errorMessage, setErrorMessage] = useState("");
  const [user, setUser] = useState<any>();
  const [loading, setLoading] = useState(false);

  let history = useHistory();

  const [companyName, setCompanyName] = useState("");
  const [companyLogo, setCompanyLogo] = useState("");
  const [disableName, setDisableName] = useState<boolean>(true);

  const styles = {
    top: {
      marginBottom: "20px",
    },
    bottom: {
      // borderBottom: "1px solid #fafafa",
      marginTop: "110px",
      marginBottom: "20px",
    },
  };

  useEffect(() => {
    console.log(companyName);

    setDisableName(companyName.length < 3);
  }, [companyName]);

  useEffect(() => {
    const loadDash = async () => {
      if (user) {
        const types = usefulServices.getCoyTypes();

        if (!types.includes(user.type)) {
          history.push(`/dashboard`);
          return;
        }

        setLoading(true);

        try {
          const res = await GlobalServices.dashboard({
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
    if (user) {
      setFields([
        {
          name: "companyName",
          value: companyName,
          required: true,
          label: "Company Name",
          type: "text",
          placeholder: "Your Company Name",
          variant: "filled",
          setter: setCompanyName,
          disabled: false,
          defaultValue: user.company.name,
        },
        {
          name: "companyLogo",
          value: companyLogo,
          required: true,
          label: "Company Logo",
          type: "file",
          placeholder: "Your Company Logo",
          variant: "filled",
          setter: setCompanyLogo,
          disabled: false,
          defaultValue: "",
        },
      ]);
    }
  }, [user]);

  const handleEdit = async () => {
    let obj: any = {
      name: companyName,
      logo_url: companyLogo,
    };

    if (obj.logo_url === "") {
      obj = {
        name: companyName,
      };
    }

    setLoading(true);

    try {
      const res = await GlobalServices.generic(
        obj,
        "PUT",
        "Companies/" + user.company.id,
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
        let oldUser = JSON.parse(sessionStorage.getItem("user") || "");
        let oldCompany = oldUser?.data?.company;

        let newCompany = Object.assign(oldCompany, resJson.json.data);
        oldUser.data.company = newCompany;
        let newUser = oldUser;

        sessionStorage.setItem("user", JSON.stringify(newUser));
        setUser(newUser.data);

        setErrorMessage("");
      }
    } catch (err) {
      console.log(err);
      setErrorMessage("Something Broke, Please try again or contact Admin");
    }
  };

  return (
    <AppFrame
      headerText={
        user
          ? `Welcome Back, ${usefulServices.capitalizeFirstLetter(user?.name)}`
          : "Welcome Back, User"
      }
      headerTextPosition="flex-start"
      headerTextSize="h5"
      frameTitle="Company Management"
      userGetter={setUser}
      loading={loading}
    >
      <div style={styles.top}></div>
      {/* {loading && <LinearProgress />} */}
      <AppCards obj={cardsObj} />

      <Typography
        style={styles.bottom}
        color="primary"
        variant="h5"
        component="h2"
      >
        Company Information
        <Divider />
      </Typography>

      <AppForm
        fields={fields}
        submitString="Update"
        submitButtonMethod={handleEdit}
        buttonDisabled={disableName}
      />
    </AppFrame>
  );
}

export default Company;
