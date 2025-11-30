"use client";

import Navbar from "@/components/templates/Navbar";
import { withAuth } from "@/utilities/AuthWrapper";
import { Toaster } from "react-hot-toast";

function ProfileLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Navbar>
                {children}
            </Navbar>
            <Toaster />
        </>
    );
}

export default withAuth(ProfileLayout);