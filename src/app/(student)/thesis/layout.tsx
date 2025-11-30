"use client";

import Navbar from "@/components/templates/Navbar";
import { withAuth } from "@/utilities/AuthWrapper";
import { Toaster } from "react-hot-toast";

function ThesisPageLayout({
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

export default withAuth(ThesisPageLayout, ["student", "adviser", "admin"]);
