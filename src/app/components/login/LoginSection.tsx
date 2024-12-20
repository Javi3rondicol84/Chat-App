"use client";

import React, { useState, useEffect } from "react";
import { createOrLoginUser } from "@/app/utils/api";

const LoginSection = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (token !== "") {
      setTimeout(() => {
        window.location.href = "/users-list";
      }, 2000);
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = await createOrLoginUser("login", name, password);

      localStorage.setItem("token", data.token);
      localStorage.setItem("userLoggedId", data.id);
      localStorage.setItem("nameUserLogged", name);
      setToken(data.token);
    } catch (err) {
      console.log("Error logging in user: " + err);
      setError("Failed to log in. Please try again.");
    }
  };

  return (
    <>
      {!token ? (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-700">
          <div className="w-full max-w-sm bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-2xl font-semibold text-gray-800 text-center mb-6">Welcome to ChatApp</h1>
            <form className="flex flex-col" onSubmit={handleSubmit}>
              <label className="text-gray-700 font-medium mb-2">Username</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="px-4 py-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your username"
              />
              <label className="text-gray-700 font-medium mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="px-4 py-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your password"
              />
              <button
                type="submit"
                className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Sign In
              </button>
            </form>
            {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>}
            <p className="text-gray-600 text-sm text-center mt-4">
              Don't have an account?{" "}
              <a href="./register" className="text-blue-500 font-medium hover:underline">
                Register here
              </a>
            </p>
          </div>
        </div>
      ) : (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-700">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-4">Redirecting...</h1>
            <p className="text-white text-lg">Taking you to the users list</p>
          </div>
          <div className="w-16 h-16 border-4 border-white border-dotted rounded-full animate-spin mt-6"></div>
        </div>
      )}
    </>
  );
};

export default LoginSection;
