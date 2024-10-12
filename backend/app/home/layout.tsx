"use client";
import dynamic from "next/dynamic";

// Dynamically import Header and Footer components with no SSR
const Header = dynamic(() => import("../../components/Header/Header"), {
  ssr: false,
});

const Footer = dynamic(() => import("../../components/Footer"), {
  ssr: false,
});

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <div>{children}</div>
      <Footer />
    </>
  );
};

export default RootLayout;
