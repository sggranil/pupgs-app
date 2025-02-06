"use client";

import Sidenav from "@/components/organisms/Sidenav";
import { Toaster } from "react-hot-toast";

export default function ThesisLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Sidenav>
        {children}
      </Sidenav>
      <Toaster />
    </>
  );
}