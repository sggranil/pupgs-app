import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCookie } from "@/utilities/AuthUtilities";

const isClientAuthorized = () => {
  const sessionToken = getCookie(null, "session");
  return !!sessionToken;
};

export const withAuth = (WrappedComponent: React.ComponentType<any>) => {
  const WithAuthWrapper = (props: any) => {
    const [isAuthorized, setIsAuthorized] = useState(false);
    const router = useRouter();

    useEffect(() => {
      if (isClientAuthorized()) {
        setIsAuthorized(true);
      } else {
        router.push("/login");
      }
    }, [router]);

    if (!isAuthorized) {
      return <div>Loading...</div>;
    }

    return <WrappedComponent {...props} />;
  };

  return WithAuthWrapper;
};
