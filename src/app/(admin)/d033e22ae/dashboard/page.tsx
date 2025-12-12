"use client";

import React, { useState } from "react";

import Modal from "@/components/organisms/Modal";
import EnrolledSubjectModal from "@/components/organisms/Modals/ManageThesisReceiptModal";
import SubjectCardList from "@/components/organisms/ThesisReceipt/ThesisReceiptCardList";
import RoomTable from "@/components/organisms/Room/RoomTable";

import { ThesisReceipt } from "@/interface/thesis.interface";
// import ThesisCardList from "@/components/template/Thesis/ThesisCardList";

export default function Dashboard() {
  const [enrolledSubjectModal, setEnrolledSubjectModal] =
    useState<boolean>(false);
  const [thesisAttachmentsModal, setThesisAttachmentsModal] =
    useState<boolean>(false);
  const [isSubjectUpdated, setIsSubjectUpdated] = useState<boolean>(false);
  const [isThesisUpdated, setIsThesisUpdated] = useState<boolean>(false);
  const [isRoomUpdated, setIsRoomUpdated] = useState<boolean>(false);
  const [subjectData, setSubjectData] = useState<ThesisReceipt[] | null>([]);
  const [activeTab, setActiveTab] = useState<"receipts" | "room">("receipts");

  return (
    <div className="h-full">
      <div
        className="w-full h-24 rounded-md"
        style={{ backgroundImage: "url('/maroon-bg.jpg')" }}>
        <div className="flex items-end justify-between h-full">
          <h1 className="text-white text-xl font-bold p-2 pl-4">Dashboard</h1>
        </div>
      </div>

      <div className="w-full px-2 pt-6 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-2">
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-gray-700 text-md font-semibold">
              Pre-Oral Defense Enrolled
            </h2>
            <p className="text-2xl font-bold text-bgPrimary">
              {subjectData?.filter(
                (subject) => subject.receipt_name === "pre_oral_defense"
              ).length || 0}
            </p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-gray-700 text-md font-semibold">
              Thesis Proposal Enrolled
            </h2>
            <p className="text-2xl font-bold text-bgPrimary">
              {subjectData?.filter(
                (subject) => subject.receipt_name === "thesis_proposal"
              ).length || 0}
            </p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-gray-700 text-md font-semibold">
              Final Defense Enrolled
            </h2>
            <p className="text-2xl font-bold text-bgPrimary">
              {subjectData?.filter(
                (subject) => subject.receipt_name === "final_defense"
              ).length || 0}
            </p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-gray-700 text-md font-semibold">
              Confirmed Submissions
            </h2>
            <p className="text-2xl font-bold text-green-600">
              {subjectData?.filter((subject) => subject.status).length || 0}
            </p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-gray-700 text-md font-semibold">
              Pending Reviews
            </h2>
            <p className="text-2xl font-bold text-yellow-500">
              {subjectData?.filter(
                (subject) =>
                  subject.status === "pending_review" && !subject.message
              ).length || 0}
            </p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-gray-700 text-md font-semibold">
              Denied Submissions
            </h2>
            <p className="text-2xl font-bold text-red-600">
              {subjectData?.filter(
                (subject) =>
                  !subject.status?.includes("approve") === false &&
                  subject.message
              ).length || 0}
            </p>
          </div>
        </div>
      </div>

      <div className="w-full px-2">
        <div className="flex space-x-4 border-b border-gray-200 mb-4">
          <button
            onClick={() => setActiveTab("receipts")}
            className={`px-4 py-2 font-semibold ${
              activeTab === "receipts"
                ? "text-bgPrimary border-b-2 border-bgPrimary"
                : "text-gray-500 hover:text-bgPrimary"
            }`}>
            Check Enrollees
          </button>
          <button
            onClick={() => setActiveTab("room")}
            className={`px-4 py-2 font-semibold ${
              activeTab === "room"
                ? "text-bgPrimary border-b-2 border-bgPrimary"
                : "text-gray-500 hover:text-bgPrimary"
            }`}>
            Room
          </button>
        </div>
      </div>

      <div className="w-full px-2 pb-12">
        {/* {activeTab === "receipts" && <Thesis thesisData={[]} />} */}
        {activeTab === "room" && <RoomTable />}
      </div>
    </div>
  );
}
