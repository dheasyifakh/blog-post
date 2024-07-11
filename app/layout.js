import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./_components/header";
import Footer from "./_components/footer";
import { Plus_Jakarta_Sans } from "next/font/google";

const jakartaSans = Plus_Jakarta_Sans({ subsets: ["latin"] });


export const metadata = {
  title: "Tit;koma",
  description: "Find your Theraphist",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={jakartaSans.className}>
        <div className="md:px-20 shadow-md">
          <Header/>
        </div>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
