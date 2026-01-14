"use client";

import React, { use } from "react";

import { useGetThesis } from "@/hooks/thesis";

import { Thesis } from "@/interface/thesis.interface";
import ThesisInfoLoadingState from "@/components/template/SkeletonContainer/ThesisInfoSkeleton";

import { ThesisTitle } from "@/components/organisms/Thesis/ThesisTitle";
import AttachmentCardList from "@/components/organisms/Attachment/AttachmentCardList";

import ThesisInformation from "@/components/organisms/Thesis/ThesisInformation";
import ThesisReceiptCardList from "@/components/organisms/ThesisReceipt/ThesisReceiptCardList";
import { useUserContext } from "@/providers/UserProvider";
import ThesisFiles from "@/components/template/Thesis/ThesisFiles";
import { useAllAdvisers } from "@/hooks/adviser";

export default function ThesisInfoPage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = use(params);
  const { user } = useUserContext();

  const {
    data: adviserData,
    isLoading: isUserLoading,
    refetch: refetchAdviser,
  } = useAllAdvisers();

  const {
    data: thesisData,
    isLoading: isThesisLoading,
    error,
    refetch,
  } = useGetThesis(id);

  const handleThesisUpdated = () => {
    refetch();
  };

  const thesisInfo = thesisData?.data as Thesis;
  const advisers = adviserData?.data || [];

  const dean = thesisInfo?.student
    ? advisers.find(
        (data: any) =>
          data.user.department === thesisInfo.student?.user?.department &&
          data.user.position === "Dean"
      )
    : null;

  const programChair = thesisInfo?.student
    ? advisers.find(
        (data: any) =>
          data.user.program === thesisInfo.student?.user?.program &&
          data.user.position === "Program Chair"
      )
    : null;

  console.log(dean);

  const programChairUser = programChair?.user;
  const programChairName = programChairUser
    ? [
        programChairUser.prefix,
        programChairUser.first_name,
        programChairUser.last_name,
        programChairUser.ext_name,
      ]
        .filter(Boolean)
        .join(" ")
    : "No Program Chair Assigned";

  const deanUser = dean?.user;
  const deanName = deanUser
    ? [
        deanUser.prefix,
        deanUser.first_name,
        deanUser.last_name,
        deanUser.ext_name,
      ]
        .filter(Boolean)
        .join(" ")
    : "No Dean Assigned";

  if (isThesisLoading) {
    return <ThesisInfoLoadingState />;
  }

  return (
    <>
      <div className="flex flex-col items-start justify-center md:flex-row gap-4 w-full lg:px-32 py-4 px-8">
        <div className="flex flex-col w-full md:w-1/3 gap-4">
          <div className="bg-white ring-1 ring-black ring-opacity-10 transition-opacity px-4 pt-2 pb-2 rounded-md">
            <h1 className="text-content-primary text-lg font-bold pb-1 pt-2">
              <ThesisTitle
                user={user}
                thesisId={thesisInfo.id}
                thesisTitle={thesisInfo.thesis_title}
                setIsUpdated={handleThesisUpdated}
              />
            </h1>
            <div className="mb-2">
              <p className="text-content-primary font-semibold text-sm pr-2">
                {thesisInfo.student?.user.last_name},{" "}
                {thesisInfo.student?.user.first_name}
              </p>
              <p className="font-normal text-xs">
                {thesisInfo.student?.user.program}
              </p>
            </div>
          </div>
          <div className="bg-white ring-1 ring-black ring-opacity-10 transition-opacity px-4 pb-2 rounded-md">
            <ThesisInformation
              user={user}
              thesisData={thesisInfo}
              setIsUpdated={handleThesisUpdated}
            />
          </div>
        </div>

        <div className="flex flex-col w-full md:w-1/2 gap-4">
          <div className="bg-white ring-1 ring-black ring-opacity-10 transition-opacity px-4 pb-2 rounded-md">
            <ThesisReceiptCardList
              user={user}
              thesisId={id}
              receipts={thesisInfo?.thesis_receipts}
              setIsUpdated={handleThesisUpdated}
            />
          </div>

          <div className="bg-white ring-1 ring-black ring-opacity-10 transition-opacity px-4 pb-2 rounded-md">
            <AttachmentCardList
              user={user}
              thesisId={thesisInfo.id}
              attachments={thesisInfo.attachments}
              setIsUpdated={handleThesisUpdated}
            />
          </div>
          <div className="bg-white ring-1 ring-black ring-opacity-10 transition-opacity px-4 pb-2 rounded-md">
            <ThesisFiles
              thesisData={thesisInfo}
              thesisReceipt={null}
              programChair={programChairName}
              dean={deanName}
            />
          </div>
        </div>
      </div>
    </>
  );
}
