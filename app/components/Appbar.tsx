"use client"
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import GlobalStyles from '@mui/material/GlobalStyles';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { useState, createContext, useContext } from "react";
import { UserContext } from "../layout"
import Cookies from 'js-cookie';
import {getCookie} from "../lib/cookie"
// function getCookie(name: string) {
//     let value = "; " + document.cookie;
//     let parts = value.split("; " + name + "=");
//     if (parts.length === 2) {
//         return parts.pop().split(";").shift();
//     }
// }



export default function Appbar() {

    const [id, setId] = React.useContext(UserContext)

    if (typeof window !== 'undefined') {
        let cookieValue = getCookie("access_token");
    }
    const deleteCookie=(name: string)=>{
        Cookies.remove(name);
        setId("")
        window.location.href = '/'
    }
    const handleLogout = () => {
        deleteCookie("access_token")
    }

    return (<React.Fragment>
        <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
        <CssBaseline />
        <AppBar
            position="static"
            color="primary"
            elevation={0}
            sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
        >
            <Toolbar sx={{ flexWrap: 'wrap' }}>
                <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
                    
                </Typography>
                {id &&
                <nav>
                    <Link
                        variant="button"
                        
                        href="/items"
                        sx={{ my: 1, mx: 1.5,color:"white",textDecoration:"none" }}
                    >
                        Items
                    </Link>

                </nav>
                }
                {id
                    ? <Button onClick={handleLogout} variant="outlined" sx={{ my: 1, mx: 1.5, color: "white", borderColor: "white" }}>Logout</Button>
                    : <Button href="/" variant="outlined" sx={{ my: 1, mx: 1.5, color: "white", borderColor: "white" }}>Login</Button>

                }


            </Toolbar>
        </AppBar>
    </React.Fragment>)
} 