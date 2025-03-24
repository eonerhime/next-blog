import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import Header from "./components/Header";
import { ClerkProvider } from "@clerk/nextjs";
import FlowbiteProvider from "./components/Flowbiterovider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Ifeoma's Blog",
  description: "A blog about love, life, and everything in between.",
};

export default function RootLayout({ children }) {
  return (
    <FlowbiteProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ClerkProvider>
            <Header />
            {children}
          </ClerkProvider>
        </body>
      </html>
    </FlowbiteProvider>
  );
}
