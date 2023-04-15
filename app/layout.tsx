import ClientOnly from "./components/ClientOnly";
import RegisterModal from "./components/models/RegisterModal";
import Navbar from "./components/navbar/Navbar";
import "./globals.css";
import { Nunito } from "next/font/google";
import ToasterProvider from "./providers/ToasterProvider";
import LoginModal from "./components/models/LoginModal";
import getCurrentUser from "./actions/getCurrenUser";
import RentModal from "./components/models/RentModal";

export const metadata = {
  title: "Mkoko Hub",
  description: "Buy and Sell Used Cars",
};

const font = Nunito({
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <LoginModal />
          <RentModal />
          <RegisterModal />
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        {children}
      </body>
    </html>
  );
}
