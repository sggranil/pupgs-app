"use client";

import { EnrolledSubject } from "@/interface/thesis.interface";
import { useState } from "react";
import useSubjectRequest from "@/hooks/subject";
import { showToast } from "../organisms/Toast";

interface Subject {
    setIsUpdated: (isUpdated: boolean) => void;
    userData: EnrolledSubject[];
}

const SubjectTable: React.FC<Subject> = ({ userData, setIsUpdated }) => {
    const [subjectFilter, setSubjectFilter] = useState<string>("All");
    const [statusFilter, setStatusFilter] = useState<string>("All");
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [statusUpdate, setStatusUpdate] = useState<Map<number, boolean>>(new Map());
    const { confirmedSubject } = useSubjectRequest();

    const filteredData = userData.filter((subject) => {
        const matchesSubject = subjectFilter === "All" || subject.subject_name === subjectFilter;
        const matchesStatus = statusFilter === "All" || String(subject.is_confirmed) === statusFilter;
        const matchesName = `${subject.student?.user?.first_name} ${subject.student?.user?.last_name}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase());

        return matchesSubject && matchesStatus && matchesName;
    });

    const handleCheckboxChange = async (subject: EnrolledSubject, index: number) => {
        // Toggle the confirmation status
        const newStatus = !(statusUpdate.get(index) ?? subject.is_confirmed);
    
        // Update the local state with the new status
        const updatedStatus = new Map(statusUpdate);
        updatedStatus.set(index, newStatus);
        setStatusUpdate(updatedStatus);
    
        // Prepare data to send to the backend
        const data = {
            id: subject.id,
            is_confirmed: newStatus, // Send the new status
        };
    
        try {
            // Call the backend to update the confirmation status
            const response = await confirmedSubject(data);
    
            if (response) {
                showToast("Subject updated successfully", "success");
                setIsUpdated(true); // Optional: Trigger UI updates or re-fetch
            } else {
                showToast(response.message || "Subject update failed", "error");
            }
        } catch (error) {
            showToast("An error occurred while updating the subject", "error");
        }
    };    

    return (
        <div className="w-full overflow-x-auto">
            <div className="mb-4 flex justify-end space-x-2">
                <div>
                    <select
                        className="p-2 border rounded-md"
                        value={subjectFilter}
                        onChange={(e) => setSubjectFilter(e.target.value)}
                    >
                        <option value="All">All</option>
                        <option value="Thesis Writing 1">Thesis Writing 1</option>
                        <option value="Thesis Writing 2">Thesis Writing 2</option>
                    </select>
                </div>

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
                        <th className="p-3 text-left text-sm font-semibold text-gray-700">Subject Name</th>
                        <th className="p-3 text-left text-sm font-semibold text-gray-700">OR Number</th>
                        <th className="p-3 text-left text-sm font-semibold text-gray-700">File</th>
                        <th className="p-3 text-left text-sm font-semibold text-gray-700">Status</th>
                        <th className="p-3 text-left text-sm font-semibold text-gray-700">Update Status</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((subject, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50">
                            <td className="p-3 text-sm text-gray-900">{subject.student?.user?.first_name} {subject.student?.user?.last_name}</td>
                            <td className="p-3 text-sm text-gray-900">{subject.subject_name}</td>
                            <td className="p-3 text-sm text-gray-900">{subject.or_number}</td>
                            <td className="p-3 text-sm text-gray-900">
                                <a className="text-blue-500 underline" href={subject.attachment} target="_blank">View File</a>
                            </td>
                            <td className="p-3 text-sm text-gray-500">
                                {!subject.is_confirmed ? "Pending Review" : "Confirmed"}
                            </td>
                            <td className="p-3 text-sm text-gray-500">
                                <input
                                    type="checkbox"
                                    checked={statusUpdate.get(index) ?? subject.is_confirmed ?? false}
                                    onChange={() => handleCheckboxChange(subject, index)}
                                    className="form-checkbox"
                                />
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SubjectTable;
