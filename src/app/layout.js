import { Toaster } from "react-hot-toast";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { CartProvider } from "../components/context/CartContext";
import WhatsAppButton from "../components/WhatsAppButton";

// AI Chatbot
import PVClassesChatbot from "../components/Pvclasseschatbot";
import TapToSpeakCTA from "../components/Taptospeak";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "PV Classes - Best Online Learning Platform for Competitive Exams",
  description:
    "PV Classes is a leading online learning platform offering comprehensive courses, study materials, and expert guidance for competitive exams.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CartProvider>
          {/* Header */}
          <Header />

          {/* Main Page */}
          
          <main>{children}</main>

          {/* Footer */}
          <Footer />


          {/* Toast Notifications */}
          <Toaster position="top-right" />

          {/* Floating WhatsApp */}
          <WhatsAppButton />

          {/* AI Chatbot */}
          <PVClassesChatbot />
          <TapToSpeakCTA variant="floating" />
        </CartProvider>
      </body>
    </html>
  );
}