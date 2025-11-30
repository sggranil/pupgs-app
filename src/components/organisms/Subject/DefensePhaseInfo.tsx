import React from "react";

import PDFDownloadWrapper from "@/components/wrapper/PDFExportWrapper";
import ThesisHonorarium from "@/components/templates/Forms/ThesisHonorarium";
import PageHeader from "@/components/templates/Forms/component/PageHeader";
import PageFooter from "@/components/templates/Forms/component/PageFooter";
import { Thesis } from "@/interface/thesis.interface";
import { getUserInfoFromCookies } from "@/utilities/AuthUtilities";
import { formatStatus } from "@/utilities/StringFormatter";

interface DefensePhaseInfoProps {
  thesisData: Thesis | null;
  isSubjectLoaded: boolean;
}

const DefensePhaseInfo: React.FC<DefensePhaseInfoProps> = ({
  thesisData,
  isSubjectLoaded,
}) => {
  const userData = getUserInfoFromCookies();

  const subjects = thesisData?.enrolled_subjects ?? [];
  const latestSubject = subjects[subjects.length - 1] ?? null;
  const latestSubjectStatus = latestSubject?.status ?? "";

  console.log(`SUBJECTS: ${JSON.stringify(thesisData)}`);

  // Determine current phase
  let currentPhase = "N/A";
  if (isSubjectLoaded) {
    currentPhase = "Loading...";
  } else if (thesisData?.status === "pending_review") {
    currentPhase = "Concept Paper Proposal";
  } else if (!latestSubject) {
    currentPhase = "Upload your Official Receipt located at Profile Section";
  } else if (latestSubject.status === "reupload_required") {
    currentPhase = "Reupload Required";
  } else if (["invalid", "rejected"].includes(latestSubjectStatus)) {
    currentPhase = "Please check your receipt";
  } else {
    currentPhase = latestSubject.subject_name ?? "N/A";
  }

  // Check if current subject requires action
  const isActionRequiredStatus = latestSubject
    ? ["reupload_required", "invalid", "rejected"].includes(latestSubjectStatus)
    : false;

  // Display formatted thesis status
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
            content={
              <ThesisHonorarium
                thesisData={thesisData}
                enrolledSubject={latestSubject}
              />
            }
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
              "Loading..."
            ) : latestSubject?.or_number ? (
              `#${latestSubject.or_number}`
            ) : (
              <span className="text-gray-400">Not available</span>
            )}
          </p>
        </div>

        {/* Current Phase */}
        <div>
          <span className="font-semibold text-sm text-gray-600">
            Current Phase
          </span>
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
            {displayStatus}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DefensePhaseInfo;
