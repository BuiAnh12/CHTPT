import Footer from "../../../components/Footer";
import BookingHeader from "../../../components/Header/BookingHeader";

export const metadata = {
  title: "Hành khách",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang='en'>
      <body className='bg-[#f8f8f8]'>
        <BookingHeader step={2} />
        <div>{children}</div>
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
