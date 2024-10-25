// pages/_app.js
import { useEffect, useState } from "react";
import "../styles/global.css";
import Header from "../components/server/header";
import Footer from "../components/server/footer";
import { userAgent } from "next/server";

export default function MyApp({ Component, pageProps }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check local storage for user_id
        const userId = localStorage.getItem("user_id");
        setIsLoggedIn(!!userId); // Set to true if user_id exists
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("user_id"); // Remove user_id from local storage
        setIsLoggedIn(false); // Update logged-in state
        window.location.reload(); // Reload the page
        
    };

    return (
        <>
            {<Header onLogout={handleLogout} isLogin={isLoggedIn}/>}
            <Component {...pageProps} />
            {<Footer />}
        </>
    );
}
