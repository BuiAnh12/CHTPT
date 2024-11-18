"use client";
import Heading from "../../../../components/Heading";
import Footer from "../../../../components/Footer";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='bg-[#f8f8f8]'>
      <Heading title='Chọn chỗ ngồi' description='' keywords='' icon='../../public/favicon.ico' />
      <div>{children}</div>
      <Footer />
    </div>
  );
};

export default RootLayout;
