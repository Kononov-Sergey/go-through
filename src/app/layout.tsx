import MainHeader from "../../layouts/MainHeader";

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <html lang="en">
    <body>
      <MainHeader />
      {children}
    </body>
  </html>
);

export default RootLayout;
