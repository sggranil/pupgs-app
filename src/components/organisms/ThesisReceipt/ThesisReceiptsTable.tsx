"use client";

import { useState } from "react";
import { ThesisReceipt } from "@/interface/thesis.interface";

import { CONFIRMATION_OPTIONS } from "@/constants/filters";
import { UserData } from "@/interface/user.interface";

import Modal from "@/components/organisms/Modal";
import ReceiptConfirmationModal from "@/components/organisms/Modals/ReceiptConfirmationModal";

import { formatStatus } from "@/utilities/StringFormatter";

interface ThesisReceiptTableProps {
  user: UserData | null;
  receiptData: ThesisReceipt[];
  setIsUpdated: (isUpdated: boolean) => void;
}

const ThesisReceiptsTable: React.FC<ThesisReceiptTableProps> = ({
  user,
  receiptData,
  setIsUpdated,
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedReceipt, setSelectedReceipt] = useState<ThesisReceipt | null>(
    null
  );
  const [receiptsFilter, setreceiptsFilter] = useState<string>("All");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  const filteredData = receiptData.filter((receipts) => {
    const matchesreceipt =
      receiptsFilter === "All" || receipts.receipt_name === receiptsFilter;
    const matchesStatus =
      statusFilter === "All" || receipts.status === statusFilter;
    const matchesName =
      `${receipts.student?.user?.first_name} ${receipts.student?.user?.last_name}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

    return matchesreceipt && matchesStatus && matchesName;
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleOpenModal = (receipt: ThesisReceipt) => {
    setSelectedReceipt(receipt);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedReceipt(null);
    setIsModalOpen(false);
  };

  // Check for the total filtered data count to determine if an empty state is needed
  const isDataEmpty = filteredData.length === 0;

  return (
    <div className="w-full overflow-x-auto">
      {/* Filters */}
      <div className="mb-4 flex justify-end space-x-2">
        <select
          className="p-2 border rounded-md"
          value={receiptsFilter}
          onChange={(e) => {
            setreceiptsFilter(e.target.value);
            setCurrentPage(1);
          }}>
          <option value="All">All</option>
          <option value="Thesis Proposal">Thesis Proposal</option>
          <option value="Pre-Oral Defense">Pre-Oral Defense</option>
          <option value="Final Defense">Final Defense</option>
        </select>

        <select
          className="p-2 border rounded-md"
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setCurrentPage(1);
          }}>
          <option value="All">All</option>
          {CONFIRMATION_OPTIONS.map((status) => (
            <option key={status.value} value={status.value}>
              {status.label}
            </option>
          ))}
        </select>

        <input
          type="text"
          className="p-2 border rounded-md"
          placeholder="Search by student name"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      {/* --- Empty State / Table Rendering --- */}
      {isDataEmpty ? (
        <div className="text-center py-12 border border-gray-200 rounded-md bg-white shadow-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto h-10 w-10 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            No Receipts Found
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {receiptData.length > 0
              ? "Try adjusting your filters or search query."
              : "There are currently no thesis receipts to display."}
          </p>
        </div>
      ) : (
        <>
          {/* Table */}
          <table className="min-w-full bg-white border border-gray-200 rounded-md shadow-md">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="p-3 text-left text-sm font-semibold text-gray-700">
                  Student
                </th>
                <th className="p-3 text-left text-sm font-semibold text-gray-700">
                  Defense Phase
                </th>
                <th className="p-3 text-left text-sm font-semibold text-gray-700">
                  OR Number
                </th>
                <th className="p-3 text-left text-sm font-semibold text-gray-700">
                  File
                </th>
                <th className="p-3 text-left text-sm font-semibold text-gray-700">
                  Status
                </th>
                <th className="p-3 text-left text-sm font-semibold text-gray-700">
                  Update Status
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((receipt, index) => (
                <tr key={index} className="border-b">
                  <td className="p-3 text-sm text-gray-900">
                    {receipt.student?.user?.first_name}{" "}
                    {receipt.student?.user?.last_name}
                  </td>
                  <td className="p-3 text-sm text-gray-900">
                    {receipt.receipt_name}
                  </td>
                  <td className="p-3 text-sm text-gray-900">
                    {receipt.or_number}
                  </td>
                  <td className="p-3 text-sm text-gray-900">
                    <a
                      className="text-blue-500 underline"
                      href={receipt.attachment}
                      target="_blank"
                      rel="noopener noreferrer">
                      View File
                    </a>
                  </td>
                  <td className="p-3 text-sm text-gray-500">
                    {formatStatus(receipt.status)}
                  </td>
                  {user?.role !== "adviser" ? (
                    <td className="p-3 text-sm text-gray-500">
                      <button
                        className="bg-bgPrimary text-sm font-medium p-2 text-white rounded-md"
                        onClick={() => handleOpenModal(receipt)}>
                        Change Status
                      </button>
                    </td>
                  ) : (
                    <td className="p-3 text-sm text-gray-500">
                      Approval is restricted to the Program Head.
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50">
              Previous
            </button>
            <span className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50">
              Next
            </button>
          </div>
        </>
      )}

      {/* Modal */}
      {isModalOpen && selectedReceipt && (
        <Modal
          title="Update Status"
          isModalOpen={isModalOpen}
          setModalOpen={handleCloseModal}>
          <ReceiptConfirmationModal
            setIsUpdated={setIsUpdated}
            setIsModalOpen={handleCloseModal}
            receiptData={selectedReceipt}
          />
        </Modal>
      )}
    </div>
  );
};

export default ThesisReceiptsTable;
