"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Modal from "@/components/organisms/Modal";
import ThesisConfirmationModal from "./ThesisConfirmationModal";
import { Thesis } from "@/interface/thesis.interface";
import { Adviser } from "@/interface/user.interface";
import { getUserInfoFromCookies } from "@/utilities/AuthUtilities";

interface Subject {
    setIsUpdated: (isUpdated: boolean) => void;
    userData: Thesis[];
}

const ThesisTable: React.FC<Subject> = ({ userData, setIsUpdated }) => {
    const [selectedThesis, setSelectedThesis] = useState<Thesis | null>(null);
    const [adviserData, setAdviserData] = useState<Adviser[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [statusFilter, setStatusFilter] = useState<string>("All");
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [thesisFilter, setThesisFilter] = useState<string>("");

    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 10;

    const userInfo = getUserInfoFromCookies();
    const router = useRouter();

    const filteredData = userData.filter((thesis) => {
        const matchesThesis =
            thesisFilter === "" || thesis.thesis_title.toLowerCase().includes(thesisFilter.toLowerCase());
        const matchesStatus =
            statusFilter === "All" || thesis.is_confirmed === (statusFilter === "true");
        const matchesName =
            searchQuery === "" ||
            `${thesis.user?.first_name ?? ""} ${thesis.user?.last_name ?? ""}`
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
    const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

    return (
        <div className="w-full overflow-x-auto">
            {/* Filters */}
            <div className="mb-4 flex justify-end space-x-2">
                <select
                    className="p-2 border rounded-md"
                    value={statusFilter}
                    onChange={(e) => {
                        setStatusFilter(e.target.value);
                        setCurrentPage(1);
                    }}
                >
                    <option value="All">All</option>
                    <option value="true">Confirmed</option>
                    <option value="false">Pending Review</option>
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

            {/* Table */}
            <table className="min-w-full bg-white border border-gray-200 rounded-md shadow-md">
                <thead>
                    <tr className="bg-gray-100 border-b">
                        <th className="p-3 text-left text-sm font-semibold text-gray-700">Student</th>
                        <th className="p-3 text-left text-sm font-semibold text-gray-700">Thesis Title</th>
                        <th className="p-3 text-left text-sm font-semibold text-gray-700">File</th>
                        <th className="p-3 text-left text-sm font-semibold text-gray-700">Status</th>
                        <th className="p-3 text-left text-sm font-semibold text-gray-700">Update Status</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedData.map((thesis, index) => (
                        <tr key={index} className="border-b">
                            <td className="p-3 text-sm text-gray-900">
                                {thesis.user?.first_name} {thesis.user?.last_name}
                            </td>
                            <td className="p-3 text-sm text-gray-900">{thesis.thesis_title}</td>
                            <td className="p-3 text-sm text-gray-900">
                                <a
                                    className="text-blue-500 underline"
                                    href={thesis.proposals[0]?.file_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    View File
                                </a>
                            </td>
                            <td className="p-3 text-sm text-gray-500">
                                {!thesis.is_confirmed ? "Pending Review" : "Confirmed"}
                            </td>
                            {(userInfo?.role != "adviser" || userInfo?.role == "student") ? (
                                <td className="p-3 text-sm text-gray-500">
                                    <button
                                        className="bg-bgPrimary text-sm font-medium p-2 text-white rounded-md"
                                        onClick={() => {
                                            setSelectedThesis(thesis);
                                            setIsModalOpen(true);
                                        }}
                                    >
                                        Change Status
                                    </button>
                                    {thesis?.is_confirmed && (
                                        <button
                                            className="ml-2 bg-green-800 text-sm font-medium p-2 text-white rounded-md"
                                            onClick={() => {
                                                router.push(`/thesis/info/?id=${thesis.id}`);
                                            }}
                                        >
                                            Modify
                                        </button>
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
                    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                >
                    Previous
                </button>
                <span className="text-sm text-gray-600">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>

            {/* Modal */}
            <Modal title="Confirm Thesis" isModalOpen={isModalOpen} setModalOpen={setIsModalOpen}>
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
