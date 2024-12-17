"use client";

import React, { useState, useEffect, use } from "react";
import { createOrLoginUser } from "@/app/utils/api";
import { generateToken, getToken, verifyToken } from "@/app/utils/jwt";

const LoginSection = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        //if token exists, redirect to my chats

        if(token !== '') {
            // window.location.href = '/mychats';
        }
    });


     const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault();
    
            try {
                const data = await createOrLoginUser("login", name, password);

                localStorage.setItem('token', data.token);
                localStorage.setItem('userLoggedId', data.id);
                setToken(data.token);
                window.location.href = '/users-list';

            }
            catch(err) {
                console.log("error login user: "+err);
                return;
            } 
        }

    return (
        <>
         {!token ? (
             <div className="w-full flex flex-col justify-center items-center">
             <form className="flex flex-col w-48 bg-green-500" onSubmit={handleSubmit}>
                     <label className="text-center">Username</label>
                     <input 
                     type="text" 
                     value={name}
                     onChange={(e) => setName(e.target.value)}
                     />
                     <label className="text-center">Password</label>
                     <input 
                     type="password"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     />
                     <button type="submit">Sign in</button>
             </form>
             <h2>Don't have an account? <a href="./register">Register here</a></h2>
         </div>
         ): (
            <h1>redirecting...</h1>
         )};
       
    </>
    );
};

export default LoginSection;