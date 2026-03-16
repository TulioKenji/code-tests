import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Contexts from "@/components/contexts";
import { Suspense } from "react";
import Loading from "@/components/common/Loading";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Codeleap Network",
  description: "Codeleap Network code test front-end",
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" }
    ],
    shortcut: "/icon.png",
    apple: "/icon.png"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} antialiased`}
      >
        <div className="bg-background">
          <Suspense fallback={<Loading />}>
            <Contexts>
              {children}
            </Contexts>
          </Suspense>
        </div>
      </body>
    </html>
  );
}
