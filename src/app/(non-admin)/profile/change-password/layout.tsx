"use client";

import { AuthGuard } from "@/providers/AuthGuard";
import Navbar from "@/components/template/Navbar";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "@/providers/UserProvider";

function ChangePasswordPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <UserProvider>
      <AuthGuard roles={["adviser", "admin", "chairperson", "dean", "student"]}>
        <Navbar>{children}</Navbar>
      </AuthGuard>
      <Toaster />
    </UserProvider>
  );
}

export default ChangePasswordPageLayout;
