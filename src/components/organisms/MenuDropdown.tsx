"use client";

import React, { useEffect, useState } from "react";

import { removeCookie } from "@/utilities/AuthUtilities";

import { useRouter } from "next/navigation";
import Modal from "./Modal";
import ManageUserModal from "./Modals/ManageUserModal";
import { useGetUser } from "@/hooks/user";
import { User } from "@/interface/user.interface";

interface MenuDropdownProps {
  userId: number | undefined;
}

const MenuDropdown: React.FC<MenuDropdownProps> = ({ userId }) => {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [fromUserProfile, setFromUserProfile] = useState<boolean>(false);
  const [isUpdated, setIsUpdated] = useState<boolean>(false);

  const logoutUser = () => {
    removeCookie("access_token");
    removeCookie("refresh_token");

    router.replace(`/login`);
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = (event: MouseEvent) => {
    if (
      isOpen &&
      !(
        event.target instanceof Element &&
        event.target.closest(".menu-dropdown")
      )
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", closeMenu);
    return () => {
      document.removeEventListener("click", closeMenu);
    };
  }, [isOpen]);

  const { data: userData, refetch } = useGetUser(userId);
  const userInfo = userData?.data as User;

  const handleUserUpdated = () => {
    refetch();
  };

  return (
    <>
      <div className="relative inline-block text-left">
        <button
          className="flex flex-row items-center justify-center text-content-primary border-l-2 border-gray-200 pl-4"
          onClick={handleToggle}
          aria-expanded={isOpen}
          aria-controls="menu-dropdown">
          <span className="material-symbols-outlined">account_circle</span>
          <span className="material-symbols-rounded text-content-secondary">
            arrow_drop_down
          </span>
        </button>

        {isOpen && (
          <div
            className="menu-dropdown absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            role="menu"
            aria-orientation="vertical"
            tabIndex={-1}>
            <div className="px-4 py-2 border-b border-gray-200">
              <p className="text-sm font-bold">
                {userInfo.first_name} {userInfo.last_name}
              </p>

              <p className="text-xs font-normal">{userInfo.department}</p>
              <p className="text-[10px] italic font-normal">
                {userInfo.program}
              </p>
            </div>

            <div className="py-1" role="none">
              <button
                tabIndex={-1}
                className="w-full text-start text-content-primary px-4 py-2 text-sm hover:bg-gray-100"
                onClick={() => setIsModalOpen(true)}>
                Profile Settings
              </button>
              <button
                tabIndex={-1}
                className="w-full text-start text-content-primary px-4 py-2 text-sm hover:bg-gray-100"
                onClick={() => logoutUser()}>
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
      <Modal
        title="Profile Settings"
        isModalOpen={isModalOpen}
        modalType="info"
        setModalOpen={setIsModalOpen}>
        <ManageUserModal
          setIsModalOpen={setIsModalOpen}
          setIsUpdated={handleUserUpdated}
          isShowEdit={setShowEdit}
          userData={userInfo}
          fromUserProfile={fromUserProfile}
        />
      </Modal>
    </>
  );
};

export default MenuDropdown;
