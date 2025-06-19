import React from "react";
import Image from "next/image";
import { getUserInfoFromCookies } from "@/utilities/AuthUtilities";

const UserInfoCard = () => {
  // TODO: Fetch User Info
  const imageUrl = "/user.svg";
  const userData = getUserInfoFromCookies();

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
          <p className="text-sm font-semibold text-textPrimary">Lorem Ipsum</p>
          <p className="text-xs text-gray-500">{userData?.role}</p>
        </div>
      </div>
    </div>
  );
};

export default UserInfoCard;
