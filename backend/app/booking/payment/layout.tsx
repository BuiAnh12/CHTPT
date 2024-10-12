import Footer from "../../../components/Footer";
import BookingHeader from "../../../components/Header/BookingHeader";

export const metadata = {
  title: "Thanh toán",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang='en'>
      <body className='bg-[#f8f8f8]'>
        <BookingHeader step={4} />
        <div>{children}</div>
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
