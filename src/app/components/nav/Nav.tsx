"use client";
import React from "react";

const Nav = () => {
    return (
        <>
            <header className="flex w-full bg-green-200 h-10 justify-center">
                <nav className="flex bg-blue-300 w-8/12 h-full">
                    <ul className="flex justify-evenly w-full items-center">
                        <li><a className="hover:text-green-500" href="./mychats">my chats</a></li>
                        <li><a className="hover:text-green-500" href="./login">login</a></li>
                        <li><a className="hover:text-green-500" href="./register">register</a></li>
                    </ul>
                </nav>
            </header>
        </>
    );
};

export default Nav;