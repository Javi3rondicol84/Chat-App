"use client";
import SocketClient from "@/app/websocket/socket-client";
import React, { useEffect, useState } from "react";
import { getToken, verifyToken } from "@/app/utils/jwt";
import Nav from "@/app/components/nav/Nav";

const chat = () => {
    const [token, setToken] = useState<string | null>(null);


    useEffect(() => {
        const storedToken = getToken();
  
        if(storedToken !== '') {
            setToken(storedToken);
        }

        // console.log(token);
        // if(token == null) {
        //     window.location.href = '/login';
        // }

    }, []);

    return (
        <> 
            {token ? (
                <>
                 <Nav />
                 <SocketClient />   
                </>
            ): (
                <h1>Redirecting...</h1>
            )};
        </>
    );
};

export default chat;