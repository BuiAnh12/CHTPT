"use client";
import { Toaster } from "react-hot-toast";
import "../styles/global.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { UserProvider } from "../contexts/UserContext";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang='en'>
      <body>
        <UserProvider>{children}</UserProvider>
        <Toaster position='top-center' reverseOrder={false} />
      </body>
    </html>
  );
};

export default RootLayout;
