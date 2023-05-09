"use client"
import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { getCookie } from "../lib/cookie"
import BasicSelect from '../components/BasicSelect';
import {CookieContext} from "../layout"
export default function Item() {
    const [cookie, setCookie] = React.useContext(CookieContext);

    return (
        <Container component="main" maxWidth="lg">
            <Typography component="h1" variant="h5" sx={{ display: "flex", justifyContent: "center" }}>
                商品資訊
            </Typography>
            <BasicSelect token={cookie}/>

            
        </Container>
    )
}