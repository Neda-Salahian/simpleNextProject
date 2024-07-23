import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";

export const metadata: Metadata = {
  title: "Next JS 14",
  description: "Next JS 14 Crash Course",
};

const latoFont = localFont({
  src: "../public/font/Lato-Light.ttf",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <body className={` bg-slate-900 text-slate-200 ${latoFont.className}`}>
          <main className="p-4">
            {children}
          </main>
        </body>
    </html>
  );
}
