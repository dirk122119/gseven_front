"use client"
import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { redirect } from 'next/navigation';
import { UserContext } from './layout';
import {getCookie,setCookie} from "./lib/cookie"
const theme = createTheme();

// function setCookie(name: string, value: string, days: number) {
//   var expires = "";
//   if (days) {
//     var date = new Date();
//     date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
//     expires = "; expires=" + date.toUTCString();
//   }


//   document.cookie = `${name}=${value};expires=${expires};path=/`;

// }

// function getCookie(name: string) {
//   let value = "; " + document.cookie;
//   let parts = value.split("; " + name + "=");
//   if (parts.length === 2) {
//     return parts.pop().split(";").shift();
//   }
// }


export default function SignIn() {
  const [id, setId] = React.useContext(UserContext)


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    console.log({
      userid: data.get('userid'),
      password: data.get('password'),
    });

    let formdata = new FormData();
    formdata.append("username", `${data.get('userid')}`);
    formdata.append("password", `${data.get('password')}`);

    let requestOptions = {
      method: 'POST',
      body: formdata,
    };
    fetch("http://35.76.111.9/token", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result["access_token"])
        setCookie("access_token", result["access_token"], 7);
      })
      .catch(error => console.log('error', error));

    let cookieValue = getCookie("access_token");
    let myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${cookieValue}`);
    let getRequestOptions = {
      method: 'GET',
      headers: myHeaders,
    };
    let result = fetch("http://35.76.111.9/users/info", getRequestOptions)
      .then(response => response.json())
      .then(result => {setId(result["user_id"])
      window.location.href = '/items'})
      .catch(error => console.log('error', error));
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >

        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="userid"
            label="User ID"
            name="userid"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            color="primary"
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
}