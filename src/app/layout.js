import { Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";

const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-hanken-grotesk",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata = {
  title: "PI TOPUP - Top Up Games Terpercaya",
  description:
    "Website top up games terpercaya dengan berbagai pilihan game dan metode pembayaran",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${hankenGrotesk.variable} ${hankenGrotesk.variable} antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
