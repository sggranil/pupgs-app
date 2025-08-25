"use client";

import { EnrolledSubject } from "@/interface/thesis.interface";
import { formatStatus } from "@/utilities/StringFormatter";

interface Subject {
    userData: EnrolledSubject
}

const SubjectCard: React.FC<Subject> = ({ userData }) => {
    return (
        <div className="w-full">
            <div className="flex items-center justify-between py-4 p-3 bg-white rounded-md shadow-md">
                <div>
                    <h2 className="text-md font-bold text-textPrimary">{userData.subject_name}</h2>
                    <p className="text-xs font-semibold text-textPrimary">OR #{userData.or_number}</p>
                    <p className="text-xs text-gray-500 pt-2">Status: {formatStatus(userData.status)}</p>
                </div>
            </div>
        </div>
    );
}

export default SubjectCard;