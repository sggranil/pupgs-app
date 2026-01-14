"use client";

import React, { useState } from "react";

import RoomTable from "@/components/organisms/Room/RoomTable";
import { useAllReceipts } from "@/hooks/receipts";
import { ThesisReceipt } from "@prisma/client";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<"receipts" | "room">("room");

  const { data: receiptData } = useAllReceipts();

  const listReceipt = receiptData?.data || ([] as ThesisReceipt[]);

  return (
    <div>
      <div
        className="w-full h-24 rounded-md"
        style={{ backgroundImage: "url('/maroon-bg.jpg')" }}>
        <div className="flex items-end justify-between h-full">
          <h1 className="text-white text-xl font-bold p-2 pl-4">Dashboard</h1>
        </div>
      </div>

      <div className="w-full px-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-2 mt-2">
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-gray-700 text-md font-semibold">
              Pre-Oral Defense Enrolled
            </h2>
            <p className="text-2xl font-bold text-bgPrimary">
              {listReceipt?.filter(
                (receipt: any) => receipt.receipt_name === "pre_oral_defense"
              ).length || 0}
            </p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-gray-700 text-md font-semibold">
              Thesis Proposal Enrolled
            </h2>
            <p className="text-2xl font-bold text-bgPrimary">
              {listReceipt?.filter(
                (receipt: any) => receipt.receipt_name === "thesis_proposal"
              ).length || 0}
            </p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-gray-700 text-md font-semibold">
              Final Defense Enrolled
            </h2>
            <p className="text-2xl font-bold text-bgPrimary">
              {listReceipt?.filter(
                (receipt: any) => receipt.receipt_name === "final_defense"
              ).length || 0}
            </p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-gray-700 text-md font-semibold">
              Confirmed Submissions
            </h2>
            <p className="text-2xl font-bold text-green-600">
              {listReceipt?.filter((receipt: any) => receipt.status).length ||
                0}
            </p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-gray-700 text-md font-semibold">
              Pending Reviews
            </h2>
            <p className="text-2xl font-bold text-yellow-500">
              {listReceipt?.filter(
                (receipt: any) =>
                  receipt.status === "pending_review" && !receipt.message
              ).length || 0}
            </p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-gray-700 text-md font-semibold">
              Denied Submissions
            </h2>
            <p className="text-2xl font-bold text-red-600">
              {listReceipt?.filter(
                (receipt: any) =>
                  !receipt.status?.includes("approve") === false &&
                  receipt.message
              ).length || 0}
            </p>
          </div>
        </div>
      </div>

      <div className="w-full px-2 pt-4">
        <div className="flex space-x-4 border-b border-gray-200 mb-4">
          <button
            onClick={() => setActiveTab("room")}
            className={`px-4 py-2 font-semibold ${
              activeTab === "room"
                ? "text-bgPrimary border-b-2 border-bgPrimary"
                : "text-gray-500 hover:text-bgPrimary"
            }`}>
            Room Management
          </button>
        </div>
      </div>

      <div className="w-full px-2 pb-12">
        {activeTab === "room" && <RoomTable />}
      </div>
    </div>
  );
}
