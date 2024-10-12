"use client";
import dynamic from "next/dynamic";

// Dynamically import Header and Footer components with no SSR
const BookingHeader = dynamic(() => import("../../../components/Header/BookingHeader"), {
  ssr: false,
});

const Footer = dynamic(() => import("../../../components/Footer"), {
  ssr: false,
});

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='bg-[#f8f8f8]'>
      <BookingHeader step={2} />
      <div>{children}</div>
      <Footer />
    </div>
  );
};

export default RootLayout;
