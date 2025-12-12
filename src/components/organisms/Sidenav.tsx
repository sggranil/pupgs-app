import React, { useState, useEffect } from "react";
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
  const router = useRouter();

  const { user } = useUserContext();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = (event: MouseEvent) => {
    if (
      isOpen &&
      !(event.target instanceof Element && event.target.closest(".sidenav"))
    ) {
      setIsOpen(false);
    }
  };

  const logoutUser = () => {
    removeCookie("access_token");
    removeCookie("refresh_token");

    router.push(`/d033e22ae/login`);
  };

  useEffect(() => {
    const handleResize = () => {
      const isCurrentlyDesktop = window.innerWidth >= 768;
      setIsDesktop(isCurrentlyDesktop);

      if (!isCurrentlyDesktop) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
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

  return (
    <div className="flex h-screen">
      {/* Overlay for mobile when open */}
      {isOpen && !isDesktop && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={toggleMenu}
        />
      )}

      {/* Mobile Toggle Button (Always visible on mobile, outside sidebar flow) */}
      {!isDesktop && (
        <button
          onClick={toggleMenu}
          // Positioned top-left, hidden when sidebar is open or on desktop
          className={`fixed top-4 left-4 p-2 text-gray-600 hover:text-gray-900 z-30 ${
            isOpen ? "hidden" : "block"
          }`}>
          <span className="material-symbols-rounded">menu</span>
        </button>
      )}

      {/* Sidebar Content (Fixed position to stay visible) */}
      <div
        className={`fixed inset-y-0 left-0 bg-white text-content-primary w-42 transform sidenav ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:translate-x-0 md:w-64 shadow-lg z-20 h-screen flex flex-col`}>
        <div className="h-16 flex items-center justify-center border-b border-gray-200 flex-shrink-0">
          <img src="/pup.png" alt="Logo" className="w-10 h-10 mr-2" />
          <div className="flex flex-col">
            <span className="text-xl font-bold text-content-primary">PUP</span>
            <span className="text-sm font-normal text-content-primary">
              Graduate Thesis Monitoring
            </span>
          </div>
        </div>
        <nav className="mt-4 p-3 flex flex-col justify-between flex-grow overflow-y-auto">
          <div className="flex flex-col text-sm">
            {user?.role != "adviser" && (
              <>
                <Link
                  href={`/d033e22ae/dashboard`}
                  className={`flex flex-row items-center block my-1 px-4 py-2 rounded-md hover:cursor-pointer hover:opacity-85 hover:bg-brand-primary hover:text-white active:bg-brand-primary active:text-white ${
                    pathname === `/d033e22ae/dashboard`
                      ? "bg-brand-primary text-white"
                      : ""
                  }`}>
                  <span className="material-symbols-rounded mr-2">
                    dashboard
                  </span>
                  Dashboard
                </Link>
                {user?.role === "admin" && (
                  <>
                    <Link
                      href="/d033e22ae/users"
                      className={`flex flex-row items-center block my-1 px-4 py-2 rounded-md hover:cursor-pointer hover:opacity-85 hover:bg-brand-primary hover:text-white active:bg-brand-primary active:text-white ${
                        pathname === "/d033e22ae/users"
                          ? "bg-brand-primary text-white"
                          : ""
                      }`}>
                      <span className="material-symbols-rounded mr-2">
                        manage_accounts
                      </span>
                      User Management
                    </Link>
                    <Link
                      href="/d033e22ae/receipts"
                      className={`flex flex-row items-center block my-1 px-4 py-2 rounded-md hover:cursor-pointer hover:opacity-85 hover:bg-brand-primary hover:text-white active:bg-brand-primary active:text-white ${
                        pathname === "/receipts"
                          ? "bg-brand-primary text-white"
                          : ""
                      }`}>
                      <span className="material-symbols-rounded mr-2">
                        docs
                      </span>
                      Receipts
                    </Link>
                  </>
                )}
              </>
            )}

            <Link
              href={`/d033e22ae/thesis`}
              className={`flex flex-row items-center block my-1 px-4 py-2 rounded-md hover:cursor-pointer hover:opacity-85 hover:bg-brand-primary hover:text-white active:bg-brand-primary active:text-white ${
                pathname === `/d033e22ae/thesis` ||
                pathname.includes("/d033e22ae/thesis/")
                  ? "bg-brand-primary text-white"
                  : ""
              }`}>
              <span className="material-symbols-rounded mr-2">assignment</span>
              Thesis Management
            </Link>
          </div>

          <div className="mt-auto">
            {/* <a
              className="flex flex-row items-center text-sm block my-1 px-4 py-2 rounded-md hover:cursor-pointer hover:opacity-85 hover:bg-brand-primary hover:text-white active:bg-brand-primary active:text-white"
              onClick={logoutUser}>
              <span className="material-symbols-rounded mr-2">logout</span>
              Logout
            </a> */}
          </div>
        </nav>
      </div>

      <div className="flex-1 flex flex-col md:ml-64">
        <div className="flex justify-between items-center h-16 border-b border-gray-300 z-50 bg-white px-4">
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 text-gray-600 hover:text-gray-900">
            <span className="material-symbols-rounded">menu</span>
          </button>
          <div className="md:block">
            <MenuDropdown userId={user?.id} />
          </div>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export default Sidenav;
