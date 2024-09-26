import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/navbar/navbar";
import Providers from "./providers";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Learn-E - E-learning platform",
  description: "Learn-E - E-learning platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <Navbar
            left={[
              { text: "Accueil", href: "/" },
              { text: "Créer une formation", href: "" },
              { text: "Parcourir les formations", href: "" },
            ]}
            right={[
              { text: "Connexion", href: "/login" },
              { text: "Inscription", href: "/signup" },
            ]}
          />
          {children}
        </Providers>
      </body>
    </html>
  );
}
