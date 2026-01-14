"use client";

import { useState } from "react";

import NavbarLinks from "@/components/organisms/NavbarLinks";
import { useUserContext } from "@/providers/UserProvider";

const Navbar = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [department, setDepartment] = useState<string | undefined>("");
  const { user, isLoading: isUserContextLoading } = useUserContext();
  const userId = user?.id ?? Number(user?.id);

  return (
    <div className="w-full z-0">
      <div className="fixed top-0 left-0 right-0 flex md:justify-evenly justify-between items-center w-full border-b border-gray-300 z-0 bg-white px-4">
        <div className="flex items-center">
          <img src="/pup.png" alt="Logo" className="w-10 h-10 mr-3" />
          <div className="flex flex-col">
            <span className="hidden md:block text-lg font-bold text-content-primary leading-none">
              Polytechnic University of the Philippines
            </span>
            <span className="hidden md:block text-sm font-normal text-content-secondary whitespace-nowrap leading-none mt-[3px]">
              {department}
            </span>
            <span className="hidden md:block text-xs font-normal text-content-secondary whitespace-nowrap leading-none mt-[3px]">
              Graduate Studies
            </span>
          </div>
        </div>

        <NavbarLinks department={setDepartment} userId={userId} />
      </div>

      <main className="flex flex-col items-center w-full bg-app-surface min-h-screen overflow-hidden pt-16">
        {children}
      </main>
    </div>
  );
};

export default Navbar;
