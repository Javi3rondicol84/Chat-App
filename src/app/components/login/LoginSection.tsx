"use client";

import React, { useState, useEffect } from "react";
import { createOrLoginUser } from "@/app/utils/api";
import { generateToken, getToken } from "@/app/utils/jwt";

const LoginSection = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const token = getToken();
        
        if(token) {
            window.location.href = "/mychats";
        }
    });



     const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault();
    
            try {
                const data = await createOrLoginUser("login", name, password);
                console.log("logged in "+ data.token);
                localStorage.setItem('token', data.token);
                setToken(data.token);
                window.location.href = '/mychats';
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