"use client";
import Footer from "../../../../components/Footer";
import Heading from "../../../../components/Heading";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='bg-[#f8f8f8]'>
      <Heading title='Thông tin hành khách' description='' keywords='' icon='../../public/favicon.ico' />
      <div>{children}</div>
      <Footer />
    </div>
  );
};

export default RootLayout;
