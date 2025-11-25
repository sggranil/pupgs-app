"use client";

import { EnrolledSubject } from "@/interface/thesis.interface";
import { formatStatus } from "@/utilities/StringFormatter";

interface Subject {
  subjectData: EnrolledSubject;
}

const SubjectCard: React.FC<Subject> = ({ subjectData }) => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-4 p-3 bg-white rounded-md shadow-md">
        <div>
          <h2 className="text-md font-bold text-textPrimary">
            {subjectData.subject_name}
          </h2>
          <p className="text-xs font-semibold text-textPrimary">
            OR #{subjectData.or_number}
          </p>
          <p className="text-xs text-gray-500 pt-2">
            Thesis: {subjectData?.thesis_id}
          </p>
          <p className="text-xs text-gray-500 pt-2">
            Status: {formatStatus(subjectData.status)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SubjectCard;
