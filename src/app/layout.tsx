import "./globals.css";
import MainHeader from "../layouts/main/MainHeader";

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <html lang="en">
    <body className="w-screen h-screen flex flex-col gap-8 px-8 pt-4 pb-12">
      <MainHeader />
      {children}
    </body>
  </html>
);

export default RootLayout;
