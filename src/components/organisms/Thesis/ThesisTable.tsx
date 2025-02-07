"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Modal from "@/components/organisms/Modal";
import ConfirmThesisModal from "@/components/organisms/Thesis/ConfirmThesisModal";
import { Thesis } from "@/interface/thesis.interface";
import { Adviser } from "@/interface/user.interface";

interface Subject {
    setIsUpdated: (isUpdated: boolean) => void;
    userData: Thesis[];
}

const ThesisTable: React.FC<Subject> = ({ userData, setIsUpdated }) => {
    const [ selectedThesis, setSelectedThesis ] = useState<Thesis | null>(null);
    const [ adviserData, setAdviserData ] = useState<Adviser[]>([]);
    const [thesisModal, setThesisModal] = useState<boolean>(false);
    const [statusFilter, setStatusFilter] = useState<string>("All");
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [thesisFilter, setThesisFilter] = useState<string>("");
    
    const router = useRouter();

    const filteredData = userData.filter((thesis) => {
        const matchesThesis = thesisFilter === "" || thesis.thesis_title.toLowerCase().includes(thesisFilter.toLowerCase());
        const matchesStatus = statusFilter === "All" || thesis.is_confirmed === (statusFilter === "true");
        const matchesName = searchQuery === "" || 
            `${thesis.user?.first_name ?? ""} ${thesis.user?.last_name ?? ""}`
                .toLowerCase()
                .includes(searchQuery.toLowerCase());

        return matchesThesis && matchesStatus && matchesName;
    });

    return (
        <div className="w-full overflow-x-auto">
            <div className="mb-4 flex justify-end space-x-2">
                <div>
                    <select
                        className="p-2 border rounded-md"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="All">All</option>
                        <option value="true">Confirmed</option>
                        <option value="false">Pending Review</option>
                    </select>
                </div>

                <div>
                    <input
                        type="text"
                        className="p-2 border rounded-md"
                        placeholder="Search by thesis title"
                        value={thesisFilter}
                        onChange={(e) => setThesisFilter(e.target.value)}
                    />
                </div>

                <div>
                    <input
                        type="text"
                        className="p-2 border rounded-md"
                        placeholder="Search by student name"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            <table className="min-w-full bg-white border border-gray-200 rounded-md shadow-md">
                <thead>
                    <tr className="bg-gray-100 border-b">
                        <th className="p-3 text-left text-sm font-semibold text-gray-700">Student</th>
                        <th className="p-3 text-left text-sm font-semibold text-gray-700">Thesis Title</th>
                        <th className="p-3 text-left text-sm font-semibold text-gray-700">File</th>
                        <th className="p-3 text-left text-sm font-semibold text-gray-700">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((thesis, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50 cursor-pointer"
                            onClick={() => {
                                if (!thesis.is_confirmed) {
                                    setSelectedThesis(thesis)
                                    setThesisModal(true)
                                } else {
                                    router.push(`/thesis/?id=${thesis.id}`)
                                }
                            }}  
                        >
                            <td className="p-3 text-sm text-gray-900">
                                {thesis.user?.first_name} {thesis.user?.last_name}
                            </td>
                            <td className="p-3 text-sm text-gray-900">{thesis.thesis_title}</td>
                            <td className="p-3 text-sm text-gray-900">
                                <a className="text-blue-500 underline" href={thesis.proposals[0]?.file_url} target="_blank">View File</a>
                            </td>
                            <td className="p-3 text-sm text-gray-500">
                                {!thesis.is_confirmed ? "Pending Review" : "Confirmed"}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Modal title="Confirm Thesis" isModalOpen={thesisModal} setModalOpen={setThesisModal}>
                <ConfirmThesisModal thesisId={selectedThesis?.id} />
            </Modal>
        </div>
    );
};

export default ThesisTable;
