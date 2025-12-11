"use client";
import { useEffect, useState } from "react";

import UsersTable from "@/components/organisms/Users/UsersTable";
import { User } from "@/interface/user.interface";
import { useAllUsers } from "@/hooks/user";

export default function UserPage() {
  const [users, setUsers] = useState<User[]>([]);

  const {
    data: userData,
    isLoading: isThesisLoading,
    error,
    refetch,
  } = useAllUsers();

  const handleThesisUpdated = () => {
    refetch();
  };

  useEffect(() => {
    if (userData?.data) {
      setUsers(userData.data);
    }
  }, [userData]);

  return (
    <div>
      <div
        className="w-full h-24 rounded-md"
        style={{ backgroundImage: "url('/maroon-bg.jpg')" }}>
        <div className="flex items-end justify-between h-full">
          <h1 className="text-white text-xl font-bold p-2 pl-4">
            User Management
          </h1>
        </div>
      </div>
      <UsersTable userData={users} setIsUpdated={handleThesisUpdated} />
    </div>
  );
}
