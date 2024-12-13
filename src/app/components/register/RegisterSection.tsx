"use client";

import React, { useState, useEffect } from "react";  
import { createOrLoginUser } from "@/app/utils/api";

const RegisterSection = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const data = await createOrLoginUser("register", name, password);

            console.log(data);

            window.location.href = '/mychats';
        }
        catch(err) {
            console.log("error creating user: "+err);
            return;
        } 
    }

    return (
        <>
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
                    <button type="submit">Register</button>
            </form>
            <h2>Al ready have an account? <a href="./login">Sign in here</a></h2>
        </div>
        </>
    );
};

export default RegisterSection;