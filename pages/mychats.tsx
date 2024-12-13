"use client";
import SocketClient from "@/app/websocket/socket-client";
import React, { useEffect, useState } from "react";
import { getToken } from "@/app/utils/jwt";
import Nav from "@/app/components/nav/Nav";

const MyChats = () => {
    const [token, setToken] = useState<string | null>(null);
    // if(verifyToken(token)) {

    // }

    // if(token === undefined) {
    //     console.log("error");
    // }
    // else {
    //     console.log(token);
    // }

    useEffect(() => {
        // Get the token from localStorage or cookies
        const storedToken = getToken();
        setToken(storedToken);

        if (!storedToken) {
            console.log("No token found. Redirecting...");
            // Redirect to login or handle unauthenticated access
            window.location.href = "/login"; // Change to your login route
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

export default MyChats;