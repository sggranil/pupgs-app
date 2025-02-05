"use client";

import { EnrolledSubject } from "@/interface/thesis.interface";

interface Subject {
    userData: EnrolledSubject
}

const SubjectCard: React.FC<Subject> = ({ userData }) => {
    return (
        <div className="w-full">
            <div className="flex items-center justify-between p-3 bg-white rounded-md shadow-md">
                <div>
                    <h2 className="text-md font-semibold text-textPrimary">{userData.subject_name}</h2>
                    <p className="text-xs text-gray-500">Status: {
                        userData.subject_name ? "Pending Review" : "Confirmed" 
                    }</p>
                </div>
                <button
                    className="px-3 py-2 text-sm font-normal rounded-md whitespace-nowrap bg-bgPrimary text-white"
                >
                    Edit
                </button>
            </div>
        </div>
    );
}

export default SubjectCard;