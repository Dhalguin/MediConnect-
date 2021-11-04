import { Box, IconButton, Icon, Typography, Grid } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { AccountCircle, ControlPoint } from "@mui/icons-material";
import { teal } from "@mui/material/colors";
import { socket } from "../Controlers/notifications";
import swal from "sweetalert";

const CardAdd = ({
  name,
  lastname,
  address,
  specialities,
  sendNotification,
  idPatient,
  idDoctor,
  email,
  styles,
}) => {
  //Global state
  let userLog = useSelector((state) => state.users.users);

  const handleClick = () => {
    let userReciver = {
      email: email,
      id: idDoctor,
    };
    sendNotification(userReciver, userLog, socket);
    swal({
      title: "Se envio la solicitud!",
      text: `Espera a que ${name} la acepte`,
      icon: "success",
      button: "Entendido",
    });
  };

  let docName = "Dr. " + name + " " + lastname;

  return (
    <Box
      bgcolor={teal[700]}
      width={"80%"}
      height={"130px"}
      sx={{ borderRadius: "5px", padding: "1em" }}
    >
      <Grid container style={{ height: "100%" }}>
        <Grid item xs={3}>
          <Icon style={{ width: "100%", height: "100%", textAlign: "center" }}>
            <AccountCircle style={{ fontSize: "80px", color: teal[50] }} />
          </Icon>
        </Grid>
        <Grid item xs={7}>
          <Typography
            variant="h5"
            style={{
              fontWeight: "400",
              color: teal[50],
              marginBottom: "0.4em",
            }}
          >
            {docName}
          </Typography>
          <Typography
            variant="body1"
            style={{ color: teal[50], marginBottom: "0.2em" }}
          >
            <strong>Especialidad:</strong> {specialities}
          </Typography>
          <Typography variant="body1" style={{ color: teal[50] }}>
            <strong>Ubicación:</strong> {address}
          </Typography>
        </Grid>
        <Grid
          item
          xs={2}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IconButton onClick={() => handleClick()}>
            <ControlPoint style={{ fontSize: "60px", color: teal[50] }} />
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CardAdd;