// components/Header.js
import React, { useEffect, useState } from "react";

const Header = ({ onLogout, isLogin }) => {

    return (
        <header className="bg-blue-600 text-white p-4 flex justify-between">
            <h1 className="text-lg">Sale Ticket Backend</h1>
            {/* Conditionally render the logout button */}
            {isLogin && (
                <button onClick={onLogout} className="bg-red-500 p-2 rounded">
                    Logout
                </button>
            )}
        </header>
    );
};

export default Header;
