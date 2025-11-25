"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

import { User } from "@/interface/user.interface";
import { EnrolledSubject } from "@/interface/thesis.interface";

import useUserRequest from "@/hooks/user";

import Modal from "@/components/organisms/Modal";
import EnrolledSubjectModal from "@/components/organisms/Subject/EnrolledSubjectModal";
import SubjectCardList from "@/components/organisms/Subject/SubjectCardList";
import EditProfile from "@/components/organisms/EditProfile";

import { getUserInfoFromCookies } from "@/utilities/AuthUtilities";
import UsersTable from "@/components/organisms/Users/UsersTable";

export default function Profile() {
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const [subjectData, setSubjectData] = useState<EnrolledSubject[] | null>([]);

  const [enrolledSubjectModal, setEnrolledSubjectModal] =
    useState<boolean>(false);

  const [isSubjectUpdated, setIsSubjectUpdated] = useState<boolean>(false);
  const [fromUserProfile, setFromUserProfile] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [showUpdate, setShowUpdate] = useState<boolean>(false);

  const confirmedCount =
    subjectData?.filter((subject) => subject.status).length ?? 0;

  const userData = getUserInfoFromCookies();

  const { getUser } = useUserRequest();

  const fetchUser = async () => {
    setLoading(true);
    const response = await getUser(Number(userData?.userId));
    if (response) {
      setUserProfile(response.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUser();
  }, [showUpdate]);

  return (
    <div className="h-1/3">
      <div
        className="w-full h-1/3 py-12 rounded-md"
        style={{
          backgroundImage: "url('/maroon-bg.jpg')",
        }}>
        <div className="flex align-center justify-between">
          <h1 className="text-white text-xl font-bold p-2 pl-4">
            Profile Info
          </h1>

          <button
            disabled={loading}
            onClick={() => {
              setShowEdit((prev) => !prev);
              setFromUserProfile(true);
            }}
            className={`w-28 h-10 mx-2 px-3 py-2 text-sm font-semibold rounded-md disabled:opacity-60 whitespace-nowrap bg-white text-textPrimary`}>
            {!showEdit ? "Edit Profile" : "Cancel"}
          </button>
        </div>
      </div>
      <div className="flex items-center justify-between rounded-md border border-gray-200 my-4">
        <div className="flex flex-row items-center p-4">
          {loading ? (
            <div className="w-20 h-20 border-4 border-t-4 border-gray-300 rounded-full animate-spin mr-4"></div>
          ) : (
            <Image
              src="/user.svg"
              alt="User Profile"
              width={70}
              height={70}
              className="rounded-full mr-2"
            />
          )}

          <div className="flex flex-col">
            {loading ? (
              <h1 className="text-textPrimary text-1xl md:text-3xl font-bold">
                Loading...
              </h1>
            ) : (
              <h1 className="text-textPrimary text-2xl md:text-2xl font-bold">
                {userProfile?.prefix || ""} {userProfile?.first_name}{" "}
                {userProfile?.middle_name || ""} {userProfile?.last_name}
                {userProfile?.ext_name != null
                  ? `, ${userProfile?.ext_name}`
                  : ""}
              </h1>
            )}
            <p className="text-textBlack text-md">
              {loading
                ? "Loading..."
                : userProfile?.standing || userProfile?.position || "Admin"}
            </p>

            <p>
              {userProfile?.program
                ? `${userProfile?.department} - ${userProfile?.program}`
                : userProfile?.department}
            </p>
          </div>
        </div>
      </div>
      {userData?.role == "student" ? (
        <div className="w-full pb-12">
          <div>
            <div className="grid place-items-center">
              <p className="text-sm mb-4">
                To get started, please upload your receipt below to confirm your
                enrollment. Once confirmed, you can monitor your progress for
                each defense stage below.
              </p>
              <button
                disabled={confirmedCount > 2}
                onClick={() => setEnrolledSubjectModal(true)}
                className={`w-half h-10 px-4 text-sm font-normal rounded-md whitespace-nowrap disabled:opacity-50 bg-bgPrimary text-white`}>
                Upload Receipt
              </button>
            </div>
            <div className="flex align-center justify-center py-2 border-b border-gray-200"></div>
          </div>
          <SubjectCardList
            setSubjectData={setSubjectData}
            setIsUpdated={setIsSubjectUpdated}
            isUpdated={isSubjectUpdated}
          />
        </div>
      ) : (
        <div className="w-full px-2 pb-6">
          <UsersTable />
        </div>
      )}

      <Modal
        title="Edit Profile"
        isModalOpen={showEdit}
        setModalOpen={setShowEdit}>
        <EditProfile
          isUpdated={setShowUpdate}
          isShowEdit={setShowEdit}
          userData={userProfile}
          fromUserProfile={fromUserProfile}
        />
      </Modal>

      <Modal
        title="Upload Documents"
        isModalOpen={enrolledSubjectModal}
        setModalOpen={setEnrolledSubjectModal}>
        <EnrolledSubjectModal
          userId={userData?.userId}
          setIsModalOpen={setEnrolledSubjectModal}
          setIsUpdated={setIsSubjectUpdated}
          receiptApproveCount={confirmedCount}
        />
      </Modal>
    </div>
  );
}
