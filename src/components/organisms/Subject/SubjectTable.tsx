"use client";

import { EnrolledSubject } from "@/interface/thesis.interface";
import { useState } from "react";
import { getUserInfoFromCookies } from "@/utilities/AuthUtilities";
import Modal from "../Modal";
import SubjectConfirmationModal from "./SubjectConfirmationModal";

interface Subject {
    setIsUpdated: (isUpdated: boolean) => void;
    userData: EnrolledSubject[];
}

const SubjectTable: React.FC<Subject> = ({ userData, setIsUpdated }) => {
    const [subjectFilter, setSubjectFilter] = useState<string>("All");
    const [statusFilter, setStatusFilter] = useState<string>("All");
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [selectedSubject, setSelectedSubject] = useState<EnrolledSubject | null>(null);
    const [enrolledSubjectModal, setEnrolledSubjectModal] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 10;

    const userInfo = getUserInfoFromCookies();

    const filteredData = userData.filter((subject) => {
        const matchesSubject = subjectFilter === "All" || subject.subject_name === subjectFilter;
        const matchesStatus = statusFilter === "All" || String(subject.is_confirmed) === statusFilter;
        const matchesName = `${subject.student?.user?.first_name} ${subject.student?.user?.last_name}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase());

        return matchesSubject && matchesStatus && matchesName;
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

    return (
        <div className="w-full overflow-x-auto">
            {/* Filters */}
            <div className="mb-4 flex justify-end space-x-2">
                <select
                    className="p-2 border rounded-md"
                    value={subjectFilter}
                    onChange={(e) => {
                        setSubjectFilter(e.target.value);
                        setCurrentPage(1);
                    }}
                >
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
                    }}
                >
                    <option value="All">All</option>
                    <option value="true">Confirmed</option>
                    <option value="false">Pending Review/Denied</option>
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

            {/* Table */}
            <table className="min-w-full bg-white border border-gray-200 rounded-md shadow-md">
                <thead>
                    <tr className="bg-gray-100 border-b">
                        <th className="p-3 text-left text-sm font-semibold text-gray-700">Student</th>
                        <th className="p-3 text-left text-sm font-semibold text-gray-700">Defense Phase</th>
                        <th className="p-3 text-left text-sm font-semibold text-gray-700">OR Number</th>
                        <th className="p-3 text-left text-sm font-semibold text-gray-700">File</th>
                        <th className="p-3 text-left text-sm font-semibold text-gray-700">Status</th>
                        <th className="p-3 text-left text-sm font-semibold text-gray-700">Update Status</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedData.map((subject, index) => (
                        <tr key={index} className="border-b">
                            <td className="p-3 text-sm text-gray-900">
                                {subject.student?.user?.first_name} {subject.student?.user?.last_name}
                            </td>
                            <td className="p-3 text-sm text-gray-900">{subject.subject_name}</td>
                            <td className="p-3 text-sm text-gray-900">{subject.or_number}</td>
                            <td className="p-3 text-sm text-gray-900">
                                <a
                                    className="text-blue-500 underline"
                                    href={subject.attachment}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    View File
                                </a>
                            </td>
                            <td className="p-3 text-sm text-gray-500">
                                {subject.is_confirmed
                                    ? "Confirmed"
                                    : subject.message
                                    ? "Denied"
                                    : "Pending Review"}
                            </td>
                            {userInfo?.role !== "adviser" ? (
                                <td className="p-3 text-sm text-gray-500">
                                    <button
                                        className="bg-bgPrimary text-sm font-medium p-2 text-white rounded-md"
                                        onClick={() => {
                                            setSelectedSubject(subject);
                                            setEnrolledSubjectModal(true);
                                        }}
                                    >
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

            <div className="flex justify-between items-center mt-4">
                <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                >
                    Previous
                </button>
                <span className="text-sm text-gray-600">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>

            {/* Modal */}
            <Modal
                title="Update Status"
                isModalOpen={enrolledSubjectModal}
                setModalOpen={setEnrolledSubjectModal}
            >
                <SubjectConfirmationModal
                    setIsUpdated={setIsUpdated}
                    setIsModalOpen={setEnrolledSubjectModal}
                    subjectData={selectedSubject}
                />
            </Modal>
        </div>
    );
};

export default SubjectTable;
