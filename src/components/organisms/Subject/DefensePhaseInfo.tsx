import React from 'react';

import PDFDownloadWrapper from "@/components/wrapper/PDFExportWrapper";
import ThesisHonorarium from "@/components/forms/ThesisHonorarium";
import PageHeader from "@/components/forms/component/PageHeader";
import PageFooter from "@/components/forms/component/PageFooter";
import { EnrolledSubject, Thesis } from '@/interface/thesis.interface';
import { getUserInfoFromCookies } from '@/utilities/AuthUtilities';
import { formatStatus } from '@/utilities/StringFormatter';

interface DefensePhaseInfoProps {
    thesisData: Thesis | null;
    subjectData: EnrolledSubject | null;
    isSubjectLoaded: boolean; // true = still loading
}

const DefensePhaseInfo: React.FC<DefensePhaseInfoProps> = ({
    thesisData,
    subjectData,
    isSubjectLoaded
}) => {
    const userData = getUserInfoFromCookies();

    let currentPhase = "N/A";

    if (isSubjectLoaded) {
        currentPhase = "Loading...";
    } else if (thesisData?.status === "pending_review") {
        currentPhase = "Concept Paper Proposal";
    } else if (!subjectData) {
        currentPhase = "Upload your Official Receipt located at Profile Section";
    } else if (subjectData.status === "reupload_required") {
        currentPhase = "Reupload Required";
    } else if (["invalid", "rejected"].includes(subjectData.status ?? "")) {
        currentPhase = "Please check your receipt";
    } else {
        currentPhase = subjectData.subject_name;
    }

    const isActionRequiredStatus = ["reupload_required", "invalid", "rejected"].includes(subjectData?.status || "");

    const displayStatus = isSubjectLoaded
        ? "Loading..."
        : formatStatus(thesisData?.status ?? "");

    return (
        <div className="border border-gray-200 rounded-md p-2 px-4 mb-4">
            <div className="flex items-center justify-between border-b border-gray-300 py-2">
                <h4 className="font-bold text-lg">Phase Status</h4>
                {userData?.role === "adviser" && (
                    <PDFDownloadWrapper
                        header={<PageHeader />}
                        footer={<PageFooter />}
                        content={<ThesisHonorarium thesisData={thesisData} enrolledSubject={subjectData} />}
                        fileName="thesis-honorarium"
                        buttonLabel="Export Honorarium"
                    />
                )}
            </div>
            <div className="py-4 space-y-3">
                {/* OR Number */}
                <div>
                    <span className="font-semibold text-sm text-gray-600">OR Number</span>
                    <p className="ml-4 text-lg font-semibold text-textPrimary">
                        {isSubjectLoaded ? (
                            <span>Loading...</span>
                        ) : subjectData?.or_number ? (
                            <span>#{subjectData.or_number}</span>
                        ) : (
                            <span className="text-gray-400">Not available</span>
                        )}
                    </p>
                </div>

                {/* Current Phase */}
                <div>
                    <span className="font-semibold text-sm text-gray-600">Current Phase</span>
                    <p className="ml-4 text-lg font-semibold text-textPrimary">
                        {isActionRequiredStatus ? (
                            <span className="text-red-500">{currentPhase}</span>
                        ) : (
                            <span>{currentPhase}</span>
                        )}
                    </p>
                </div>

                {/* Status */}
                <div>
                    <span className="font-semibold text-sm text-gray-600">Status</span>
                    <p className="ml-4 text-lg font-semibold text-textPrimary">
                        <span>{displayStatus}</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default DefensePhaseInfo;
