import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUserInfoFromCookies } from "@/utilities/AuthUtilities";
import { isClientAuthorized } from "@/utilities/AuthUtilities";

export const withAuth = (WrappedComponent: React.ComponentType<any>, role?: string) => {
  const WithAuthWrapper = (props: any) => {
    const [isAuthorized, setIsAuthorized] = useState(false);
    const router = useRouter();

    useEffect(() => {
      const checkAuthorization = () => {
        const userRole = getUserInfoFromCookies('role')

        if (!isClientAuthorized()) {
          router.push(`/login`);
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

