"use client";

import React, { useEffect, useState } from "react";
import { getToken, verifyToken } from "@/app/utils/jwt";
import Nav from "@/app/components/nav/Nav";
import SocketClient from "@/app/components/socketclient/SocketClient";

const chat = () => {
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const storedToken = getToken();
  
        if(storedToken !== '') {
            setToken(storedToken);
        }

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