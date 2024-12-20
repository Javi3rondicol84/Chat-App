"use client";
import React from "react";

const Nav = () => {
    return (
        <>
          <header className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg">
            <nav className="max-w-6xl mx-auto flex justify-between items-center h-14 px-6">
              <ul className="flex space-x-6">
                <li>
                  <a
                    className="text-white font-semibold hover:text-yellow-300 transition duration-300"
                    href="./users-list"
                  >
                    User List
                  </a>
                </li>
                <li>
                  <a
                    className="text-white font-semibold hover:text-yellow-300 transition duration-300"
                    href="./logout"
                  >
                    Logout
                  </a>
                </li>
              </ul>
            </nav>
          </header>
        </>
      );
};

export default Nav;