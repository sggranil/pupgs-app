import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isClientAuthorized, getUserRoleFromCookies } from "@/utilities/AuthUtilities";
import Cookies from "js-cookie";

export const withAuth = (WrappedComponent: React.ComponentType<any>, role?: string) => {
  const WithAuthWrapper = (props: any) => {
    const [isAuthorized, setIsAuthorized] = useState(false);
    const router = useRouter();

    useEffect(() => {
      const checkAuthorization = async () => {
        const userRole = getUserRoleFromCookies()

        if (!isClientAuthorized()) {
          router.push(`/login?type=${userRole}`);
          return;
        }

        if (!role) {
          setIsAuthorized(true);
          return;
        }

        try {
          if (userRole === role) {
            setIsAuthorized(true);
          } else {
            router.push(`/dashboard/${userRole}`);
          }
        } catch (error) {
          console.error("Error parsing cookies", error);
          router.push(`/dashboard/${userRole}`);
        }
      };

      checkAuthorization();
    }, [router]);

    if (!isAuthorized) {
      return <div>Loading...</div>;
    }

    return <WrappedComponent {...props} />;
  };

  return WithAuthWrapper;
};

