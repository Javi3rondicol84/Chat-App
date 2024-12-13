"use client";
import React, { useEffect } from "react";

const Logout = () => {
    useEffect(() => {

        localStorage.removeItem('token');
        window.location.href = "/login";
    });

};

export default Logout;