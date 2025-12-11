"use client"

import { AuthGuard } from "@/providers/AuthGuard";
import Navbar from "@/components/template/Navbar";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "@/providers/UserProvider";

function ThesisPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <UserProvider>
      <AuthGuard roles={["student", "adviser"]}>
        <Navbar>{children}</Navbar>
      </AuthGuard>
      <Toaster />
    </UserProvider>
  );
}

export default ThesisPageLayout;
