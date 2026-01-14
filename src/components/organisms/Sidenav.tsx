"use client";

import React, { useState, useEffect, useCallback } from "react";
import { removeCookie } from "@/utilities/AuthUtilities";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useUserContext } from "@/providers/UserProvider";
import MenuDropdown from "./MenuDropdown";

const Sidenav = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const pathname = usePathname();
  const { user } = useUserContext();

  const toggleMenu = () => setIsOpen((prev) => !prev);

  const closeMenu = useCallback((event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (!target.closest(".sidenav")) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const isNowDesktop = window.innerWidth >= 768;
      setIsDesktop(isNowDesktop);
      setIsOpen(isNowDesktop);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isOpen && !isDesktop) {
      document.addEventListener("click", closeMenu);
    } else {
      document.removeEventListener("click", closeMenu);
    }
    return () => document.removeEventListener("click", closeMenu);
  }, [isOpen, isDesktop, closeMenu]);

  useEffect(() => {
    if (!isDesktop) {
      setIsOpen(false);
    }
  }, [pathname, isDesktop]);

  const navLinkClass = (path: string) => `
    flex flex-row items-center my-1 px-4 py-2 rounded-md transition-colors
    hover:cursor-pointer hover:bg-brand-primary hover:text-white
    ${
      pathname === path ||
      (path !== "/d033e22ae/dashboard" && pathname.includes(path))
        ? "bg-brand-primary text-white"
        : "text-content-primary"
    }
  `;

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {isOpen && !isDesktop && (
        <div
          className="fixed inset-0 bg-black/50 z-[40] transition-opacity"
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 bg-white w-64 transform sidenav shadow-lg z-[50] 
          transition-transform duration-300 ease-in-out flex flex-col
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          ${isDesktop ? "translate-x-0" : ""}`}>
        <div className="h-16 flex items-center px-6 border-b border-gray-200 flex-shrink-0">
          <img src="/pup.png" alt="Logo" className="w-10 h-10 mr-3" />
          <div className="flex flex-col leading-tight">
            <span className="text-lg font-bold text-content-primary">PUP</span>
            <span className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold">
              Thesis Monitoring
            </span>
          </div>
        </div>

        <nav className="mt-4 p-3 flex flex-col flex-grow overflow-y-auto">
          <div className="flex flex-col text-sm space-y-1">
            {user?.role !== "adviser" && (
              <>
                <Link
                  href="/d033e22ae/dashboard"
                  className={navLinkClass("/d033e22ae/dashboard")}>
                  <span className="material-symbols-rounded mr-3">
                    dashboard
                  </span>
                  Dashboard
                </Link>

                {user?.role === "admin" && (
                  <Link
                    href="/d033e22ae/users"
                    className={navLinkClass("/d033e22ae/users")}>
                    <span className="material-symbols-rounded mr-3">
                      manage_accounts
                    </span>
                    User Management
                  </Link>
                )}
              </>
            )}

            <Link
              href="/d033e22ae/receipts"
              className={navLinkClass("/d033e22ae/receipts")}>
              <span className="material-symbols-rounded mr-3">
                receipt_long
              </span>
              Receipts
            </Link>

            <Link
              href="/d033e22ae/thesis"
              className={navLinkClass("/d033e22ae/thesis")}>
              <span className="material-symbols-rounded mr-3">assignment</span>
              Thesis Management
            </Link>
          </div>
        </nav>
      </aside>

      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${
          isDesktop ? "ml-64" : "ml-0"
        }`}>
        <header className="flex justify-between items-center h-16 border-b border-gray-200 bg-white px-4 sticky top-0 z-[30]">
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-md"
            aria-label="Toggle Menu">
            <span className="material-symbols-rounded">menu</span>
          </button>
          <div className="flex-1" />
          <div className="flex items-center">
            <MenuDropdown userId={user?.id} />
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-6">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default Sidenav;
