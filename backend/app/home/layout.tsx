"use client";
import Footer from "../../components/Footer";
import Header from "../../components/Header/Header";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang='en'>
      <body>
        <Header />
        <div>{children}</div>
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
