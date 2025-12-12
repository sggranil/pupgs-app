// ThesisDashboard.tsx (Assuming this is intended for a faculty/advisor user)

"use client";

import { useState } from "react";

import { useAllThesis, useUserThesis } from "@/hooks/thesis";
import { Thesis } from "@/interface/thesis.interface";

import ThesisCardList from "@/components/organisms/Thesis/ThesisCardList";
import ThesisCardContainerSkeleton from "@/components/template/SkeletonContainer/ThesisCardSkeleton";

import { useUserContext } from "@/providers/UserProvider";
import ThesisTable from "@/components/organisms/Thesis/ThesisTable";

// Renamed the export for better clarity if used by faculty/admin
export default function ThesisDashboard() {
  const { user, isLoading: isUserContextLoading } = useUserContext();

  // Fetches theses where the current user is an advisor (listData)
  const {
    data: thesisData,
    isLoading: isThesisLoading,
    error,
    refetch: refetchUserThesis,
  } = useUserThesis(user?.id);

  // Fetches all theses (listAllData)
  const {
    data: allThesisData,
    isLoading: isAllThesisLoading,
    refetch: refetchAllThesis,
  } = useAllThesis();

  const handleThesisUpdated = () => {
    refetchUserThesis(); // Refetch the user's specific theses
  };

  const handleAllThesisUpdated = () => {
    refetchAllThesis();
  };

  // Combine loading states
  const isOverallLoading =
    isUserContextLoading || isThesisLoading || isAllThesisLoading;

  // Use data, defaulting to empty array
  const listData = thesisData?.data || ([] as Thesis[]);
  const listAllData = allThesisData?.data || ([] as Thesis[]);

  const [activeTab, setActiveTab] = useState<"advisee" | "thesis">("advisee");

  // Conditional Rendering Logic
  const hasData = listData.length > 0 || listAllData.length > 0; // 💡 CRITICAL FIX: Check .length for listAllData

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

          {/* Conditional Content Rendering */}
          {isOverallLoading ? (
            <ThesisCardContainerSkeleton />
          ) : error ? (
            <p className="text-red-600 text-center py-8">
              Error fetching your thesis data: {error.message}
            </p>
          ) : hasData ? (
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
              No thesis proposals found.
            </p>
          )}
        </div>
      </div>
    </>
  );
}
