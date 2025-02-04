import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isClientAuthorized } from "@/utilities/AuthUtilities";

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
