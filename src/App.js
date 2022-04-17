import React, { useEffect, useState } from "react";
import "./styles.css";
import { Grid, Typography, Button } from "@mui/material";
import axios from "axios";

export default function App() {
  const [userData, setUserData] = useState(undefined);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await axios.get("https://reqres.in/api/users?page=1").then((res) => {
      if (res && res.data && res.data.data) {
        setUserData(res.data.data);
      }
    });
  };

  const deleteUser = (index) => {
    let userArr = [...userData];
    let filtered = userArr.filter((item, arrIndex) => {
      return arrIndex !== index;
    });
    setUserData(filtered);
  };

  return (
    <div className="App">
      <Grid container spacing={2}>
        {userData && userData.length > 0 ? (
          userData.map((item, index) => {
            return (
              <React.Fragment>
                <Grid item xs={6}>
                  <Typography variant="h6" component="h2">
                    {`${item.first_name} ${item.last_name}`}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Button variant="outlined" onClick={() => deleteUser(index)}>
                    Delete
                  </Button>
                </Grid>
              </React.Fragment>
            );
          })
        ) : (
          <span className="userInfo">No Users</span>
        )}
      </Grid>
    </div>
  );
}
