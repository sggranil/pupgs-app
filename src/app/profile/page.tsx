"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import useUserRequest from "@/hooks/user";

import { getCookie } from "@/utilities/AuthUtilities";
import { User } from "@/interface/user.interface";

import EditProfile from "@/components/organisms/EditProfile";

export default function Profile() {
    const [ userProfile, setUserProfile ] = useState<User | null>(null);
    const [ loading, setLoading ] = useState<boolean>(false);
    const [ showEdit, setShowEdit ] = useState<boolean>(false);
    const [ showUpdate, setShowUpdate ] = useState<boolean>(false);

    const { getUser } = useUserRequest();
    const userId = getCookie(null, "id");

    const fetchUser = async () => {
        setLoading(true);
        const response = await getUser(Number(userId));
        if (response) {
            setUserProfile(response.data);
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchUser();
    }, [showUpdate]);

    return (
        <div className="w-full p-2 md:p-8">
            <div className="flex items-center justify-between border-b border-gray-200">
                <div className="flex flex-row items-center py-4">
                    {loading ? (
                        <div className="w-20 h-20 border-4 border-t-4 border-gray-300 rounded-full animate-spin mr-4"></div>
                    ) : (
                        <Image
                            src="/user.svg"
                            alt="User Profile"
                            width={80}
                            height={80}
                            className="rounded-full mr-2"
                        />
                    )}

                    <div className="flex flex-col">
                        {loading ? (
                            <h1 className="text-textPrimary text-2xl md:text-3xl font-bold">Loading...</h1>
                        ) : (
                            <h1 className="text-textPrimary text-2xl md:text-3xl font-bold">
                                {userProfile?.first_name} {userProfile?.middle_name} {userProfile?.last_name} {userProfile?.ext_name}
                            </h1>
                        )}
                        <p className="text-textBlack text-md">
                            {loading ? "Loading..." : userProfile?.standing || userProfile?.position}
                        </p>
                    </div>
                </div>
                <button
                    disabled={loading}
                    onClick={() => setShowEdit(prev => !prev)}
                    className={`w-28 px-3 py-2 text-sm font-normal rounded-md disabled:opacity-60 whitespace-nowrap 
                        ${showEdit ? "border-2 border-bgPrimary text-bgPrimary bg-transparent" : "bg-bgPrimary text-white"}`}
                    >
                    { !showEdit ? "Edit Profile" : "Cancel" }
                </button>

            </div>
            
            { showEdit && 
                <EditProfile isUpdated={setShowUpdate} isShowEdit={setShowEdit} userData={userProfile} />
            }

            <div className="w-full px-2 py-8">
                <div className="border-b border-gray-200">
                    <h1 className="text-textPrimary text-xl font-bold p-2">
                        Your Thesis
                    </h1>
                </div>
            </div>
        </div>
    );
}
