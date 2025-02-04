"use client";

import Sidenav from "@/components/organisms/Sidenav";
import { withAuth } from "@/utilities/AuthWrapper";
import { Toaster } from "react-hot-toast";

function ProfileLayout({
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

export default withAuth(ProfileLayout);