import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { login } from "../user-shared/api";

import * as React from "react";

import styles from "./LoginForm.module.css";

const LoginForm = () => {
  const [username, setUsername] = React.useState();
  const [password, setPassword] = React.useState();

  const handleClick = (username, password) => {
    login(username, password)
      .then((data) => {
        localStorage.setItem("token", data.token);
        window.location.href = "http://localhost:8080/#/catalog";
      })
      .catch((e) => console.log(e));
  };

  return (
    <Box
      component="form"
      sx={{
        padding: "32px",
        height: "100%",
        "& > :not(style)": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <Paper className={styles.userMfeLoginPaper}>
        <Typography variant="h6" fontWeight="600" gutterBottom>
          Se connecter
        </Typography>
        <div className={styles.userMfeLoginContainer}>
          <TextField
            id="login-username"
            label="Nom de l'utilisateur"
            variant="outlined"
            className={styles.userMfeTextFieldInput}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            id="login-password"
            label="Mot de passe"
            variant="outlined"
            type="password"
            className={styles.userMfeTextFieldInput}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className={styles.userMfeLoginButtonContainer}>
            <Button
              className={styles.userMfeLoginFormButton}
              onClick={() => handleClick(username, password)}
            >
              Se connecter
            </Button>
          </div>
        </div>
      </Paper>
    </Box>
  );
};

export default LoginForm;
