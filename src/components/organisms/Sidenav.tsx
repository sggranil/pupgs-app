import React, { useState, useEffect } from "react";
import ProfileCard from "../molecules/ProfileCard";
import Navbar from "../molecules/Navbar";
import { removeCookieClient, getCookie } from "@/utilities/AuthUtilities";
import { useRouter } from "next/navigation"

const getUserRoleFromCookies = () => {
    const userCookie = getCookie(null, "user");
    if (userCookie) {
        try {
            const user = JSON.parse(userCookie);
            return user?.role || null;
        } catch (e) {
            console.error("Failed to parse user cookie", e);
            return null;
        }
    }
    return null;
};

const Sidenav = ({
    children
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isDesktop, setIsDesktop] = useState(false);
    const [userRole, setUserRole] = useState<string | null>(null);
    const router = useRouter();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = (event: MouseEvent) => {
        if (isOpen && !(event.target instanceof Element && event.target.closest('.sidenav'))) {
            setIsOpen(false);
        }
    };

    const logoutUser = () => {
        removeCookieClient("session");
        removeCookieClient("user");

        router.push('/login?type=student');
    };

    useEffect(() => {
        const handleResize = () => {
            const isCurrentlyDesktop = window.innerWidth >= 768;
            setIsDesktop(isCurrentlyDesktop);

            if (!isCurrentlyDesktop) {
                setIsOpen(false);
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        document.addEventListener("click", closeMenu);
        return () => {
            document.removeEventListener("click", closeMenu);
        };
    }, [isOpen]);

    useEffect(() => {
        const role = getUserRoleFromCookies();
        setUserRole(role);
    }, []);

    return (
        <div className="flex h-screen">
            {isOpen && !isDesktop && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-10"
                    onClick={toggleMenu}
                />
            )}
            <div
                className={`fixed inset-y-0 left-0 bg-white text-textPrimary w-64 transform sidenav ${isOpen ? "translate-x-0" : "-translate-x-full"
                    } transition-transform duration-300 ease-in-out md:translate-x-0 md:w-64 shadow-lg z-20`}
            >
                <div className="h-16 flex items-center justify-center border-b border-gray-200">
                    <img
                        src="/pup.png"
                        alt="Logo"
                        className="w-10 h-10 mr-2"
                    />
                    <div className="flex flex-col">
                        <span className="text-xl font-bold text-textPrimary">PUP</span>
                        <span className="text-sm font-normal text-textPrimary">Graduate Thesis Monitoring</span>
                    </div>
                </div>
                <nav className="mt-4 p-3">
                    <a
                        href={`/dashboard/${userRole}`}
                        className="block px-4 py-2 rounded-md hover:bg-bgPrimary hover:text-white active:bg-bgPrimary active:text-white"
                    >
                        Dashboard
                    </a>
                    <a
                        href="#profile"
                        className="block px-4 py-2 rounded-md hover:bg-bgPrimary hover:text-white active:bg-bgPrimary active:text-white"
                    >
                        Profile
                    </a>
                    <a
                        href="#settings"
                        className="block px-4 py-2 rounded-md hover:bg-bgPrimary hover:text-white active:bg-bgPrimary active:text-white"
                    >
                        Settings
                    </a>
                    <a
                        className="block px-4 py-2 rounded-md hover:bg-bgPrimary hover:text-white active:bg-bgPrimary active:text-white"
                        onClick={logoutUser}
                    >
                        Logout
                    </a>
                </nav>
                <ProfileCard />
            </div>

            <div className="flex-1 flex flex-col md:ml-64">
                <Navbar setIsOpen={setIsOpen}/>
                <div className="p-4">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Sidenav;
