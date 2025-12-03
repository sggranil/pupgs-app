"use client";

import { AuthGuard } from "@/components/organisms/AuthGuard";
import Navbar from "@/components/template/Navbar";
import { Toaster } from "react-hot-toast";

function ThesisInfoLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AuthGuard roles={["student", "adviser"]}>
        <Navbar>{children}</Navbar>
      </AuthGuard>
      <Toaster />
    </>
  );
}

export default ThesisInfoLayout;
