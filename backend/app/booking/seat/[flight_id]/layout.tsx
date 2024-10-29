"use client";
import Heading from "../../../../components/Heading";
import BookingHeader from "../../../../components/Header/BookingHeader";
import Footer from "../../../../components/Footer";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='bg-[#f8f8f8]'>
      <Heading title='Chọn chỗ ngồi' description='' keywords='' icon='../../public/favicon.ico' />
      <BookingHeader step={3} />
      <div>{children}</div>
      <Footer />
    </div>
  );
};

export default RootLayout;
