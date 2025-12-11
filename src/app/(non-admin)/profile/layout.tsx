"use client";

import Navbar from "@/components/template/Navbar";
import { Toaster } from "react-hot-toast";

function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar>{children}</Navbar>
      <Toaster />
    </>
  );
}

export default ProfileLayout;
