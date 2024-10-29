"use client";
import Footer from "../../components/Footer";
import Header from "../../components/Header/Header";
import Heading from "../../components/Heading";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Heading title='PTIT Airlines' description='' keywords='' icon='../../public/favicon.ico' />
      <Header />
      <div>{children}</div>
      <Footer />
    </>
  );
};

export default RootLayout;
