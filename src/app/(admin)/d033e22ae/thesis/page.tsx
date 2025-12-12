// ThesisDashboard.tsx (Assuming this is intended for a faculty/advisor user)

"use client";

import { useState } from "react";

import { useAllThesis, useUserThesis } from "@/hooks/thesis";
import { Thesis } from "@/interface/thesis.interface";

import ThesisCardList from "@/components/organisms/Thesis/ThesisCardList";
import ThesisCardContainerSkeleton from "@/components/template/SkeletonContainer/ThesisCardSkeleton";

import { useUserContext } from "@/providers/UserProvider";
import ThesisTable from "@/components/organisms/Thesis/ThesisTable";

export default function ThesisDashboard() {
  const { user, isLoading: isUserContextLoading } = useUserContext();

  const {
    data: thesisData,
    isLoading: isThesisLoading,
    error,
  } = useUserThesis(user?.id);

  const {
    data: allThesisData,
    isLoading: isAllThesisLoading,
    error: allThesisError,
    refetch: refetchAllThesis,
  } = useAllThesis();

  const handleAllThesisUpdated = () => {
    refetchAllThesis();
  };

  const isOverallLoading =
    isUserContextLoading || isThesisLoading || isAllThesisLoading;

  const listData = thesisData?.data || ([] as Thesis[]);
  const listAllData = allThesisData?.data || ([] as Thesis[]);

  const [activeTab, setActiveTab] = useState<"advisee" | "thesis">("advisee");

  const activeList = activeTab === "advisee" ? listData : listAllData;
  const hasActiveData = activeList.length > 0;

  return (
    <>
      <div className="flex flex-col items-start justify-center md:flex-row gap-4 w-full">
        <div className="bg-white w-full pb-2 rounded-md">
          <div
            className="w-full h-24 rounded-md"
            style={{ backgroundImage: "url('/maroon-bg.jpg')" }}>
            <div className="flex items-end justify-between h-full">
              <h1 className="text-white text-xl font-bold p-2 pl-4">
                Thesis Management
              </h1>
            </div>
          </div>

          <div className="w-full px-2 pt-8">
            <div className="flex space-x-4 border-b border-gray-200 mb-4">
              <button
                onClick={() => setActiveTab("advisee")}
                className={`px-4 py-2 font-semibold ${
                  activeTab === "advisee"
                    ? "text-bgPrimary border-b-2 border-bgPrimary"
                    : "text-gray-500 hover:text-bgPrimary"
                }`}>
                Advisee (Your Theses)
              </button>
              {user?.role != "adviser" && (
                <button
                  onClick={() => setActiveTab("thesis")}
                  className={`px-4 py-2 font-semibold ${
                    activeTab === "thesis"
                      ? "text-bgPrimary border-b-2 border-bgPrimary"
                      : "text-gray-500 hover:text-bgPrimary"
                  }`}>
                  Thesis (All)
                </button>
              )}
            </div>
          </div>

          {isOverallLoading ? (
            <ThesisCardContainerSkeleton />
          ) : error || allThesisError ? (
            <p className="text-red-600 text-center py-8">
              Error fetching thesis data.
            </p>
          ) : hasActiveData ? (
            <div className="w-full px-2">
              {activeTab === "advisee" && (
                <ThesisCardList users={user} thesisData={listData} />
              )}
              {activeTab === "thesis" && (
                <ThesisTable
                  user={user}
                  thesisData={listAllData}
                  setIsUpdated={handleAllThesisUpdated}
                />
              )}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-24">
              No thesis proposals found for the selected view.
            </p>
          )}
        </div>
      </div>
    </>
  );
}
