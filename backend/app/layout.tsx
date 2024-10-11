import { Toaster } from "react-hot-toast";
import "../styles/global.css";
import "bootstrap/dist/css/bootstrap.min.css";

export const metadata = {
  title: "PTIT Airlines",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang='en'>
      <body>
        <div>{children}</div>
        <Toaster position='top-center' reverseOrder={false} />
      </body>
    </html>
  );
};

export default RootLayout;
