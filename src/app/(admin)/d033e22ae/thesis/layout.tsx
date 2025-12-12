"use client";

import { AuthGuard } from "@/providers/AuthGuard";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "@/providers/UserProvider";
import Sidenav from "@/components/organisms/Sidenav";

function ThesisPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <UserProvider>
      <AuthGuard roles={["adviser", "chairperson", "dean", "admin"]}>
        <Sidenav>{children}</Sidenav>
      </AuthGuard>
      <Toaster />
    </UserProvider>
  );
}

export default ThesisPageLayout;
