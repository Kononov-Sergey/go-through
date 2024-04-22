import "./globals.css";
import MainHeader from "../layouts/MainHeader";

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <html lang="en">
    <body className="w-screen h-screen flex flex-col">
      <MainHeader />
      {children}
    </body>
  </html>
);

export default RootLayout;
