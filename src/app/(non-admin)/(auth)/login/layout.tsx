"use client";

import Background from "@/components/molecules/Background";
import { Toaster } from "react-hot-toast";

export default function RegisterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Background>
        {children}
      </Background>
      <Toaster />
    </>
  );
}