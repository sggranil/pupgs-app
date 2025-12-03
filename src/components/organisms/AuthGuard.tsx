"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Image from "next/image";

import {
  getUserInfoFromCookies,
  isClientAuthorized,
} from "@/utilities/AuthUtilities";

interface AuthGuardProps {
  roles: string[];
  children: React.ReactNode;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ roles, children }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuthorization = () => {
      if (!isClientAuthorized()) {
        router.push(`/login`);
        return;
      }

      const userData = getUserInfoFromCookies();
      const userRole = userData?.role;

      if (roles.includes(userRole)) {
        setIsAuthorized(true);
      } else {
        router.push(`/profile`);
      }
    };

    checkAuthorization();
  }, [router, roles]);

  if (!isAuthorized) {
    return (
      <div className="w-screen h-screen">
        <div className="flex flex-col items-center justify-center w-full h-full">
          <Image
            src="/pup.png"
            alt="PUP Logo"
            width={60}
            height={60}
            className="animate-bounce"
          />
          <div className="flex flex-col items-center">
            <p className="mt-2 mb-2 text-md font-semibold animate-pulse text-content-primary">
              Checking credentials...
            </p>
            <span className="material-symbols-outlined text-brand-primary animate-spin mt-8">
              progress_activity
            </span>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
