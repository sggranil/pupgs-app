import React, { useState, useEffect } from "react";
import { removeCookie } from "@/utilities/AuthUtilities";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useUserContext } from "@/providers/UserProvider";

const Sidenav = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

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
      {isOpen && !isDesktop && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={toggleMenu}
        />
      )}
      <div
        className={`fixed inset-y-0 left-0 bg-white text-content-primary w-42 transform sidenav ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:translate-x-0 md:w-64 shadow-lg z-20`}>
        <div className="h-16 flex items-center justify-center border-b border-gray-200">
          <img src="/pup.png" alt="Logo" className="w-10 h-10 mr-2" />
          <div className="flex flex-col">
            <span className="text-xl font-bold text-content-primary">PUP</span>
            <span className="text-sm font-normal text-content-primary">
              Graduate Thesis Monitoring
            </span>
          </div>
        </div>
        <nav className="mt-4 p-3 flex flex-col justify-between">
          <div className="flex flex-col text-sm">
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
                      href="/d033e22ae/audits"
                      className={`flex flex-row items-center block my-1 px-4 py-2 rounded-md hover:cursor-pointer hover:opacity-85 hover:bg-brand-primary hover:text-white active:bg-brand-primary active:text-white ${
                        pathname === "/profile" ||
                        pathname === "/profile/change-password"
                          ? "bg-brand-primary text-white"
                          : ""
                      }`}>
                      <span className="material-symbols-rounded mr-2">
                        docs
                      </span>
                      Audit Logs
                    </Link>
                  </>
                )}
              </>
            )}

            <Link
              href="/d033e22ae/audits"
              className={`flex flex-row items-center block my-1 px-4 py-2 rounded-md hover:cursor-pointer hover:opacity-85 hover:bg-brand-primary hover:text-white active:bg-brand-primary active:text-white ${
                pathname === "/profile" ||
                pathname === "/profile/change-password"
                  ? "bg-brand-primary text-white"
                  : ""
              }`}>
              <span className="material-symbols-rounded mr-2">
                notifications
              </span>
              Notifications
            </Link>
          </div>
          <a
            className="flex flex-row items-center text-sm block my-1 px-4 py-2 rounded-md hover:cursor-pointer hover:opacity-85 hover:bg-brand-primary hover:text-white active:bg-brand-primary active:text-white"
            onClick={logoutUser}>
            <span className="material-symbols-rounded mr-2">logout</span>
            Logout
          </a>
        </nav>
      </div>

      <div className="flex-1 flex flex-col md:ml-64">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export default Sidenav;
