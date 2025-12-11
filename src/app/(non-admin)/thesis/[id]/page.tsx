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

export default function ThesisInfoPage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = use(params);
  const { user } = useUserContext();
  const userId = user?.id ?? Number(user?.id);

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
              thesisData={thesisInfo}
              setIsUpdated={handleThesisUpdated}
            />
          </div>
        </div>

        <div className="flex flex-col w-full md:w-1/2 gap-4">
          <div className="bg-white ring-1 ring-black ring-opacity-10 transition-opacity px-4 pb-2 rounded-md">
            <ThesisReceiptCardList
              userId={userId}
              thesisId={id}
              receipts={thesisInfo?.thesis_receipts}
              setIsUpdated={handleThesisUpdated}
            />
          </div>

          <div className="bg-white ring-1 ring-black ring-opacity-10 transition-opacity px-4 pb-2 rounded-md">
            <AttachmentCardList
              thesisId={thesisInfo.id}
              attachments={thesisInfo.attachments}
              setIsUpdated={handleThesisUpdated}
            />
          </div>
          <div className="bg-white ring-1 ring-black ring-opacity-10 transition-opacity px-4 pb-2 rounded-md">
            <ThesisFiles
              thesisData={thesisInfo}
              thesisReceipt={null}
              programChair={null}
              dean={null}
            />
          </div>
        </div>
      </div>
    </>
  );
}
