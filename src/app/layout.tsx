import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import { Source_Serif_4 } from "next/font/google";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const sourceSerif4 = Source_Serif_4({
  weight: ["200", "300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-source-serif-4",
});

export const metadata: Metadata = {
  title: "PUP Online Graduate Thesis Monitoring System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width, user-scalable=no" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${instrumentSans.className} ${sourceSerif4.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
