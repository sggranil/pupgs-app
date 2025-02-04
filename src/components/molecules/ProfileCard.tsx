import React from "react";
import Image from "next/image";
import { getCookie } from "@/utilities/AuthUtilities";

const UserInfoCard = () => {
  const userCookie = getCookie(null, "user");
  let userData = null;

  if (userCookie) {
    try {
      userData = JSON.parse(userCookie);
    } catch (error) {
      console.error("Error parsing user cookie:", error);
    }
  }

  const imageUrl = "/user.svg";
  const userName = userData ? `${userData.firstName} ${userData.lastName}` : "Guest";
  const userRole = userData ? `${userData.standing}` : `${userData.position}`;

  return (
    <div className="absolute bottom-4 w-full px-4">
      <div className="flex items-center p-3 bg-gray-100 rounded-md shadow">
        <Image
          src={imageUrl}
          alt="User"
          width={40}
          height={40}
          className="rounded-full mr-4"
        />
        <div>
          <p className="text-sm font-semibold text-textPrimary">{userName}</p>
          <p className="text-xs text-gray-500">{userRole}</p>
        </div>
      </div>
    </div>
  );
};

export default UserInfoCard;
