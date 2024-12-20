"use client";

import React, { useEffect, useState } from "react";
import { getToken, verifyToken } from "@/app/utils/jwt";
import Nav from "@/app/components/nav/Nav";
import SocketClient from "@/app/components/socketclient/SocketClient";
import Footer from "@/app/components/footer/Footer";

const chat = () => {
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const storedToken = getToken();
  
        if(storedToken !== '') {
            setToken(storedToken);
        } else {
            setTimeout(() => {
                window.location.href = "/login";
            }, 2000);
        }

    }, []);

    return (
        <> 
            {token ? (
                <>
                 <Nav />
                 <SocketClient />   
                 <Footer />
                </>
            ): (
                <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-700">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-white mb-4">Redirecting...</h1>
                    <p className="text-white text-lg">Taking you to the login page</p>
                </div>
                <div className="w-16 h-16 border-4 border-white border-dotted rounded-full animate-spin mt-6"></div>
            </div>
            )}
        </>
    );
};

export default chat;