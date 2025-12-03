// context/UserContext.tsx
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { getUserInfoFromCookies } from "@/utilities/AuthUtilities";

interface UserData {
  id: number;
  role: string;
  email: string;
}

interface UserContextType {
  user: UserData | null;
  isLoading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const jwtPayload = getUserInfoFromCookies();
      if (jwtPayload) {
        const userData: UserData = {
          id: jwtPayload.userId,
          role: jwtPayload.role,
          email: jwtPayload.email,
        };

        setUser(userData);
      }
    } catch (error) {
      console.error("Error reading user data from cookies:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
