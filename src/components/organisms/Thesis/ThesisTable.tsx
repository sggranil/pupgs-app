"use client";

import { useState } from "react";

import Modal from "@/components/organisms/Modal";
import ThesisConfirmationModal from "../Modals/ThesisConfirmationModal";
import { Thesis } from "@/interface/thesis.interface";
import { CONFIRMATION_STATUSES } from "@/constants/filters";
import { formatStatus } from "@/utilities/StringFormatter";
import { UserData } from "@/interface/user.interface";
import Link from "next/link";

interface ThesisTableProps {
  setIsUpdated: (isUpdated: boolean) => void;
  thesisData: Thesis[];
  user?: UserData | null;
}

const ThesisTable: React.FC<ThesisTableProps> = ({
  user,
  thesisData,
  setIsUpdated,
}) => {
  const [selectedThesis, setSelectedThesis] = useState<Thesis | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [thesisFilter, setThesisFilter] = useState<string>("");

  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  const filteredData = thesisData.filter((thesis) => {
    const matchesThesis =
      thesisFilter === "" ||
      thesis.thesis_title.toLowerCase().includes(thesisFilter.toLowerCase());
    const matchesStatus =
      statusFilter === "All" ||
      thesis.status?.toLowerCase().includes(statusFilter.toLowerCase());
    const matchesName =
      searchQuery === "" ||
      `${thesis.student?.user?.first_name ?? ""} ${
        thesis.student?.user?.last_name ?? ""
      }`
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

    return matchesThesis && matchesStatus && matchesName;
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  // Check if the filtered data is empty
  const isDataEmpty = filteredData.length === 0;

  return (
    <div className="w-full overflow-x-auto">
      <div className="mb-4 flex justify-end space-x-2">
        <select
          className="p-2 border rounded-md"
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setCurrentPage(1);
          }}>
          <option value="All">All</option>
          {CONFIRMATION_STATUSES.map((status) => (
            <option key={status.value} value={status.value}>
              {status.label}
            </option>
          ))}
        </select>
        <input
          type="text"
          className="p-2 border rounded-md"
          placeholder="Search by thesis title"
          value={thesisFilter}
          onChange={(e) => {
            setThesisFilter(e.target.value);
            setCurrentPage(1);
          }}
        />
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
            No Thesis Submissions Found
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {thesisData.length > 0
              ? "Try adjusting your filters or search query."
              : "There are currently no thesis submissions to display."}
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
                  Thesis Title
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
              {paginatedData.map((thesis, index) => (
                <tr key={index} className="border-b">
                  <td className="p-3 text-sm text-gray-900">
                    {thesis.student?.user?.first_name}{" "}
                    {thesis.student?.user?.last_name}
                  </td>
                  <td className="p-3 text-sm text-gray-900">
                    {thesis.thesis_title}
                  </td>
                  <td className="p-3 text-sm text-gray-900">
                    <a
                      className="text-blue-500 underline"
                      href={thesis.attachments[0]?.file_url}
                      target="_blank"
                      rel="noopener noreferrer">
                      View File
                    </a>
                  </td>
                  <td className="p-3 text-sm text-gray-500">
                    {formatStatus(thesis?.status)}
                  </td>
                  {user?.role != "adviser" ? (
                    <td className="p-3 text-sm text-gray-500">
                      <button
                        className="bg-brand-primary text-sm font-medium p-2 text-white rounded-md"
                        onClick={() => {
                          setSelectedThesis(thesis);
                          setIsModalOpen(true);
                        }}>
                        Change Status
                      </button>
                      {thesis?.status?.includes("approve") && (
                        <Link
                          className="ml-2 bg-green-800 text-sm font-medium p-2 text-white rounded-md"
                          href={
                            user?.role === "student"
                              ? `/thesis/${thesis.id}`
                              : `/d033e22ae/thesis/${thesis.id}`
                          }>
                          Go
                        </Link>
                      )}
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

          {/* Pagination Controls */}
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50">
              Previous
            </button>
            <span className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50">
              Next
            </button>
          </div>
        </>
      )}

      {/* Modal */}
      <Modal
        title="Confirm Thesis"
        modalType="info"
        isModalOpen={isModalOpen}
        setModalOpen={setIsModalOpen}>
        <ThesisConfirmationModal
          thesisData={selectedThesis}
          setIsModalOpen={setIsModalOpen}
          setIsUpdated={setIsUpdated}
        />
      </Modal>
    </div>
  );
};

export default ThesisTable;
