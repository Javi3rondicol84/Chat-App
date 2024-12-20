"use client";

import React, { useState } from "react";  
import { createOrLoginUser } from "@/app/utils/api";

const RegisterSection = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [redirecting, setRedirecting] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await createOrLoginUser("register", name, password);
            setRedirecting(true);

            setTimeout(() => {
                window.location.href = "/login";
            }, 2000);
        } catch (err) {
            console.log("Error creating user: " + err);
            setError("Failed to create account. Please try again.");
        }
    };

    return (
        <>
            {!redirecting ? (
                <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-500 to-teal-600">
                    <div className="w-full max-w-sm bg-white rounded-lg shadow-lg p-8">
                        <h1 className="text-2xl font-semibold text-gray-800 text-center mb-6">Create an Account</h1>
                        <form className="flex flex-col" onSubmit={handleSubmit}>
                            <label className="text-gray-700 font-medium mb-2">Username</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="px-4 py-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                placeholder="Choose a username"
                            />
                            <label className="text-gray-700 font-medium mb-2">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="px-4 py-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                placeholder="Create a password"
                            />
                            <button
                                type="submit"
                                className="w-full bg-green-500 text-white font-semibold py-2 rounded-lg hover:bg-green-600 transition duration-300"
                            >
                                Register
                            </button>
                        </form>
                        {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>}
                        <p className="text-gray-600 text-sm text-center mt-4">
                            Already have an account?{" "}
                            <a href="./login" className="text-green-500 font-medium hover:underline">
                                Sign in here
                            </a>
                        </p>
                    </div>
                </div>
            ) : (
                <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-500 to-teal-600">
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

export default RegisterSection;
